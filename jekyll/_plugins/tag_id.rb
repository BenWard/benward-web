module Jekyll
  module TagID
    def generate_tag_id(post)
      timestamp = post['global_date'].strftime("%F")

      # domains change
      domain = post['global_date'] > Date.parse('2018-01-01') ? "benward.uk" : "benward.me"

      "tag:#{domain},#{timestamp}:#{post['clean_url']}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::TagID)
