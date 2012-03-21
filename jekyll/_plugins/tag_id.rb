module Jekyll
  module TagID

    def generate_tag_id(post)
      timestamp = post['global_date'].strftime("%F")
      # TODO: Need to get the site URL from config within a filter. How?
      "tag:benward.me,#{timestamp}:#{post['url']}"
    end

  end
end

Liquid::Template.register_filter(Jekyll::TagID)