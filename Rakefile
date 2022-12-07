require 'date'
require 'json'
require 'yaml'

def jekyll(opts="", path="")
  Dir.chdir('jekyll') do
    sh "jekyll #{opts}"
  end
end

# get lat/lon from macOS shortcuts
def location_shortcut_info
  latlon = `shortcuts run "Output Lat/Lon JSON"`.chomp
  unless latlon.empty?
    JSON.parse(latlon, { :symbolize_names => true })
  else
    puts "Output Lat/Lon JSON shortcut unavailable"
    []
  end
end

def location_info
  # Check if CoreLocationCLI is installed
  `command -v CoreLocationCLI`
  if  $?.success?
    location_json = `CoreLocationCLI -format '{ "latitude": %latitude, "longitude": %longitude, "address": "%address" }'`.chomp.gsub("\n", "\\n")
    JSON.parse(location_json, { :symbolize_names => true })
  else
    puts "CoreLocationCLI not installed. Use \"brew cask install corelocationcli\""
    []
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
  Dir.chdir('jekyll') do
    `rm -r _site`
  end
end

task :rebuild => [:clean, :build]

desc "Rebuild the Jekyll site"
task :default => :build

namespace :blog do
  desc "Create a new entry"
  task :new do |t|
    puts "What's the title of this post?"
    title = STDIN.gets.chomp

    raise Error, "You must provide a title" if title.empty?

    provision_slug = title.downcase.gsub(' ', '-').gsub(/[^\w\-]/, '')

    puts "And the URL-slug? [#{provision_slug}]"
    slug = STDIN.gets.chomp
    slug = provision_slug if slug.empty?

    date = DateTime.now

    puts "Tag it? (comma-separated) []"
    tag_string = STDIN.gets.chomp

    location = location_shortcut_info
    unless location.empty?
      puts "Located at #{location[:address].gsub("\n", ', ')}" unless location.empty?
    end

    front_matter = {
      'layout' => 'blog',
      'category' => 'blog',
      'title' => title,
      'date' => date.iso8601,
      'summary' => ' ',
      'tags' => tag_string.empty? ? ' ' : tag_string.split(','),
      'geo' => location ? {
        'name' => location[:address].gsub("\n", ", "),
        'xy' => "#{location[:latitude]},#{location[:longitude]}"
      } : nil
    }.reject { |k,v| v.nil? }

    file_name = "#{DateTime.now.strftime("%Y-%m-%d")}-#{slug}.md"
    dir_name = "jekyll/_posts/blog/#{date.year}"
    path = "#{dir_name}/#{file_name}"

    Dir::mkdir dir_name unless FileTest::directory? dir_name

    File.open path, 'w' do |f|
      # Start YML Front Matter
      f.puts front_matter.to_yaml
      f.puts '---'
      f.puts "\n\n"
    end
    `open #{path}`
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
