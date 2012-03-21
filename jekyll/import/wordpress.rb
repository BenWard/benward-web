#!/usr/local/bin/ruby

require 'mysql'
require 'RedCloth'
require 'liquid'
require 'digest/md5'
require 'yaml'

@output = '../_posts/blog'
@db = Mysql.init
@db.options(Mysql::SET_CHARSET_NAME, 'utf8')
@db.real_connect('localhost', 'root', '!mysqlansosr', 'blog2')
posts = @db.query 'select * from posts where publication_status="publish"'

@comment_template = File.read('comment.liquid')
@pingback_template = File.read('pingback.liquid')

def export_entry(entry)
  tag_result = @db.query "select tag from tags, post_tags where id=tag_id and post_id=#{entry['post_id']}"
  comments_result = @db.query "select * from comments where post_id=#{entry['post_id']} and type='' ORDER BY 'date' ASC"
  pingbacks_result = @db.query "select * from comments where post_id=#{entry['post_id']} and type='pingback' ORDER BY 'date' ASC"

  pubdate = fixdate entry['published'], entry['published_gmt']
  begin
    updated = fixdate entry['updated'], entry['updated_gmt']
  rescue
    updated = false
  end

  tags = []
  tag_result.each_hash do |tag|
    tags << tag['tag']
  end if tag_result.num_rows > 0
  tags.uniq!

  filename = pubdate.strftime("%F") + "-" + entry['slug'] + '.textile'

  yml = render_yml entry, pubdate, updated, tags

  content = [to_utf8(entry['content'])]
  content << render_comments(comments_result) if comments_result.num_rows > 0
  content << render_pingbacks(pingbacks_result) if pingbacks_result.num_rows > 0

  Dir::mkdir "#{@output}/#{pubdate.year}" unless FileTest::directory? "#{@output}/#{pubdate.year}"
  File.open "#{@output}/#{pubdate.year}/#{filename}", 'w' do |f|
    # Start YML Front Matter
    f.puts '---'
    f.puts yml
    f.puts '---'
    # Content Pieces
    f.puts content.join "\n\n"
  end
end

def render_yml(entry, published, updated, tags)
  yml = [
    "layout: blog",
    "category: blog",
    "title: \"#{to_utf8(entry['title']).gsub('"', '\"')}\"",
    "date: \"#{published.to_s}\""
  ]
  yml << "updated: \"#{updated.to_s}\"" if updated
  yml << "summary: \"#{to_utf8(entry['summary']).gsub('"', '\"')}\"" if entry['summary'] != ''
  if entry['geo'] && entry['geo'] != ''
    yml << "geo:"
    yml << "  xy: #{entry['geo']}"
  end
  yml << "tags: [\"#{tags.join("\", \"")}\"]" if tags
  yml << "atomid: #{ (entry['id'] != '') ? entry['id'] : tagid(entry['slug'], published) }"
  yml.join("\n")
end

def render_comments(comments)
  if comments.num_rows > 0
    comment_array = []
    comments.each_hash do |comment|
      published = fixdate(comment['date'], comment['gmt'])
      comment['md5'] = Digest::MD5.hexdigest(comment['email'])
      comment['published'] = published.iso8601
      comment['formatted_date'] = published.strftime("%d %b %Y, %H:%M")
      comment['author'] = to_utf8(comment['author'])
      comment['content'] = RedCloth.new(to_utf8(comment['content'])).to_html
      comment_array << comment
    end
    comment_array.sort!  { |a,b| a['date'] <=> b['date'] }
    Liquid::Template.parse(@comment_template).render 'comments' => comment_array
  end
end

def render_pingbacks(pingbacks)
  if pingbacks.num_rows > 0
    pingback_array = []
    pingbacks.each_hash do |ping|
      ping['author'] = to_utf8(ping['author'])
      pingback_array << ping
    end
    Liquid::Template.parse(@pingback_template).render 'pingbacks' => pingback_array
  end
end

def fixdate(local, utc)
  begin
    utc = DateTime.parse(utc + "-0000")
  rescue
    utc = false
  end

  if utc
    offset = (utc.to_time - DateTime.parse(local).to_time)/60/60
    offset = (offset < 1 ? "-" : "+") + ("%02d" % offset.abs) + "00"
    DateTime.parse(local + offset)
  else
    DateTime.parse(local)
  end
end

def tagid(slug, published)
  "tag:benward.me,#{published.strftime("%F")}:/blog/#{slug}"
end

def to_utf8(str)
  str.encode('UTF-8', 'UTF-8', :universal_newline => true)
end

p "Processing #{posts.num_rows} posts..."

posts.each_hash do |row|
  p "Exporting #{to_utf8 row['title']}"
  export_entry row
end

p "Done."

@db.close