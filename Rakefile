require 'date'

def jekyll(opts="", path="")
  Dir.chdir('jekyll') do
    sh "jekyll #{opts}"
  end
end

desc "Build site using Jekyll"
task :build do
  jekyll('build')
end

desc "Serve jekyll test site"
task :serve do
  jekyll('serve')
end

desc "Remove existing _sites directory"
task :clean do
  sh "rm -r _site"
end

task :rebuild => [:clean, :build]

desc "Rebuild the Jekyll site"
task :default => :build

namespace :blog do
  desc "Create a new entry"
  task :new, [:slug] do |t, args|

    raise ArgumentError, "Must specify a slug name" unless args.slug

    date = DateTime.now
    slug = "#{DateTime.now.strftime("%Y-%m-%d")}-#{args.slug}"
    dir_name = "jekyll/_posts/blog/#{date.year}"
    file_name = "#{dir_name}/#{slug}.md"
    Dir::mkdir dir_name unless FileTest::directory? dir_name
    File.open file_name, 'w' do |f|
      # Start YML Front Matter
      f.puts '---'
      f.puts 'layout: blog'
      f.puts 'category: blog'
      f.puts 'title: "New Post"'
      f.puts "date: \"#{date.iso8601}\""
      f.puts "summary: "
      f.puts "tags: []"
      f.puts "geo:"
      f.puts '  name: "San Francisco"'
      f.puts '  xy: "37.77493,122.41942"'
      f.puts '---'
      f.puts "\n\n"
    end
    sh "open #{file_name}"
  end

  desc "Touch a post and set its publication date to now"
  task :touch, [:post] do |t, args|
    base = "jekyll/_posts/blog/"
    raise ArgumentError, "Must specify a post file" unless args.post

    /^([0-9]{4})\-/.match(args.post)
    year = $1

    file_name = "#{base}#{year}/#{args.post}"
    raise "Post not found" unless FileTest::file? file_name

    content = File.read file_name
    content.sub!(/^date: .*$/, "date: \"#{DateTime.now.iso8601}\"")
    File.open file_name, 'w' do |f| f.puts content end
  end

  desc "Mark a post as being updated"
  task :update, [:post] do |t, args|
    base = "jekyll/_posts/blog/"
    raise ArgumentError, "Must specify a post file" unless args.post

    /^([0-9]{4})\-/.match(args.post)
    year = $1

    file_name = "#{base}#{year}/#{args.post}"
    raise "Post not found" unless FileTest::file? file_name

    content = File.read file_name
    if /^updated:/.match(content)
      content.sub!(/^updated: .*$/, "updated: \"#{DateTime.now.iso8601}\"")
    else
      content.sub!(/^(date: .*)$/, "\\1\nupdated: \"#{DateTime.now.iso8601}\"")
    end
    File.open file_name, 'w' do |f| f.puts content end
  end

end
