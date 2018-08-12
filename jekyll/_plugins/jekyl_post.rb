module Jekyll
  # TODO: Break into separate plugins for neatness
  class BenWardPostHacks < Generator
    safe true

    def generate(site)
      site.posts.each do |post|
        # Add an additional 'global_date' property to the liquid template that
        # maintains timezones for published dates.
        post.data["global_date"] = global_date(post)

        # When rendering via multiviews, remove .html extensions from permalinks
        post.data["clean_url"] = output_url(post, site)

        # Comments and corrections to github, please
        post.data["github_source_url"] = github_url(post, site)

        # We've been using 'summary' front matter for manual excerpts
        if post.data["summary"]
          post.data["excerpt"] = post.data["summary"]
        end

        # Tumblr posts often don't have titles, so use the timestamp instead
        unless post.data["title"]
          post.data["date_title"] = "true"
          post.data["title"] = generate_title(post)
        end
      end
    end

    def global_date(post)
      post.data["date"].is_a?(String) ? DateTime.parse(post.data["date"]) : post.data["date"]
    end

    def generate_title(post)
      DateTime.parse(post.data["date"]).strftime("%B %e, %Y")
    end

    # Augment URLs in Liquid when using Apache Multiviews
    def output_url(post, site)
      site.config['multiviews'] ? post.url.sub(/\.html$/, '') : post.url
    end

    def github_url(post, site)
      gitslug = site.config['github_slug']
      gitbase = "/" + (site.config['git_base'] || "")
      "https://github.com/#{gitslug}/tree/master#{gitbase}/_posts/#{post.name}"
    end
  end
end
