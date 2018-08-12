module Liquid
  module StandardFilters
    # Redfine date: to use DateTime and preserve timezones rather than Time
    def date(input, format)

      if format.to_s.empty?
        return input.to_s
      end

      if ((input.is_a?(String) && !/^\d+$/.match(input.to_s).nil?) || input.is_a?(Integer)) && input.to_i > 0
        input = Time.at(input.to_i)
      end

      date = input.is_a?(String) ? DateTime.parse(input) : input

      if date.respond_to?(:strftime)
        date.strftime(format.to_s)
      else
        input
      end
    rescue => e
      input
    end
  end
end
