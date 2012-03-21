module Jekyll
  class Post

    attr_accessor :summary

    # Add an additional 'global_date' property to the liquid template that
    # maintains timezones for published dates.
    alias :base_liquid :to_liquid
    def to_liquid
      base_liquid.merge({
        "global_date" => self.data["date"].is_a?(String) ? DateTime.parse(self.data["date"]) : self.data["date"],
        "summary" => (self.summary if self.summary),
        "url" => output_url
      })
    end

    alias :base_transform :transform
    def transform
      # Convert the base content:
      base_transform
      # Convert page summary using the same converter as for the content.
      self.summary = converter.convert(self.data["summary"]) if self.data["summary"]
    end

    # Augment URLs in Liquid when using Apache Multiviews
    def output_url
      site.config['multiviews'] ? url.sub(/\.html$/, '') : url
    end

  end
end