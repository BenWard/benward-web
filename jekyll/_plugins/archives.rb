# Adapted from Generator by José F. Romaniello:
# <http://joseoncode.com/2011/11/27/generating-monthly-archives-with-jekyll>
#
# Generates archive folders in form config[archive_root]/YYYY/MM.html
# Passes the following into Liquid:
#
# - title: Basic page title
# - period: The year and month for the current page
# - previous_period: The previous valid period (year/month), for pagination
# - next_period: The next valid period (year/month), for pagination

module Jekyll

  class ArchiveIndex < Page

    def initialize(site, base, dir, posts, period,
                   previous_period, next_period, first_period, last_period)
      @site = site
      @base = base
      @dir = dir

      # Month or Annual index:
      @name = period['month'] ? "#{"%02d" % period['month'].to_s}.html" : "index.html"
      self.process @name

      layout = begin
        if period['month']
          site.config['archive_month_index']
        else
          site.config['archive_year_index']
        end
      end || 'archive_index.html'

      self.read_yaml File.join(base, '_layouts'), layout
      self.data['period'] = period
      self.data['first_period'] = first_period || nil
      self.data['last_period'] = last_period || nil
      self.data['next_period'] = next_period || nil
      self.data['previous_period'] = previous_period || nil
      self.data['posts'] = posts
      self.data['title'] = period['year'].to_s
      self.data['title'] << "/#{period['month']}" if period['month']
    end
  end

  class ArchiveGenerator < Generator
    safe true
    priority :normal

    def generate(site)
      # Write full year index:
      write_archive site, site.posts.docs.group_by { |c| { 'year' => c.date.year } }
      # Write monthly breakdown
      write_archive site, site.posts.docs.group_by { |c| { 'month' => c.date.month, 'year' => c.date.year } }
    end

    protected

    def write_archive(site, collection)
      collection.each_with_index do |(period, posts), i|

        first_period = collection.keys.first
        last_period = collection.keys.last
        previous_period = (i > 0) ? collection.keys[i-1] : nil
        next_period = (i < collection.keys.length) ? collection.keys[i+1] : nil

        archive_dir = File.join(period['year'].to_s)
        write_archive_index(site, archive_dir, posts, period, previous_period, next_period, first_period, last_period)
      end
    end

    def write_archive_index(site, dir, posts, period, previous_period, next_period, first_period, last_period)
      index = ArchiveIndex.new(site, site.source, dir, posts, period, previous_period, next_period, first_period, last_period)
      index.render(site.layouts, site.site_payload)
      index.write(site.dest)
      site.pages << index
    end
  end

  module ArchiveFilters

    def format_archive_date(period, format)
      DateTime.new(period['year'], period['month'] || 1, 1).strftime(format)
    end

    def archive_url(period)
      if period['month']
        format_archive_date(period, '/%Y/%m')
      else
        format_archive_date(period, '/%Y/')
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::ArchiveFilters)
