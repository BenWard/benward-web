def jekyll(opts="", path="")
  sh "jekyll " + opts
end

desc "Build site using Jekyll"
task :build do
  jekyll
end

desc "Remove existing _sites directory"
task :clean do
  sh "rm -r _site"
end

task :rebuild => [:clean, :build]

desc "Serve on Localhost with port 4000"
task :default do
  jekyll "--server --auto"
end

namespace :blog do
  desc "Create a new entry"
  task :new do

  end
end