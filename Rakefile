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

namespace :server do
  desc "Update apache configuration for the site"
  task :reconfigure do
    sh "cp conf/apache/me.benward.conf /etc/apache/sites-available/me.benward.conf"
    sh "apache2ctl reload"
  end
end