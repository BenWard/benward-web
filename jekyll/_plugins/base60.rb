require 'new_base_60'

module Jekyll
  module Base60
    def base_60(input)
      input.to_i.to_sxg
    end
  end
end

Liquid::Template.register_filter(Jekyll::Base60)