require 'nokogiri'

module Jekyll
  class Post

    attr_accessor :summary

    # Add an additional 'global_date' property to the liquid template that
    # maintains timezones for published dates.
    # base_liquid doesn't call super, so we alias it instead.
    alias :base_liquid :to_liquid
    def to_liquid
      self.summary ||= if self.data["summary"]
        self.summary = converter.convert(self.data["summary"])
      else
        self.summary = html_preview(converter.convert(self.content))
      end

      gitslug = self.site.config['github_slug']
      gitbase = "/" + (self.site.config['git_base'] || "")

      base_liquid.merge({
        "global_date" => self.data["date"].is_a?(String) ? DateTime.parse(self.data["date"]) : self.data["date"],
        "summary" => (self.summary if self.summary),
        "url" => output_url,
        'github_source_url' => "https://github.com/#{gitslug}/tree/master#{gitbase}/_posts/#{@name}"
      })
    end

    # Augment URLs in Liquid when using Apache Multiviews
    def output_url
      site.config['multiviews'] ? url.sub(/\.html$/, '') : url
    end

    def html_preview(content, paragraphs = 1)
      frag = Nokogiri::HTML::DocumentFragment.parse content
      trim_paragraphs(frag.children.first, paragraphs)
    end

    private

    def trim_paragraphs(node, total_paragraphs, para = 0)
      if node.nil?
        return ""
      elsif para >= total_paragraphs
        node.to_html
      else
        para += 1 if node.node_name == 'p'
        node.to_html + trim_paragraphs(node.next, total_paragraphs, para)
      end
    end


  end
end