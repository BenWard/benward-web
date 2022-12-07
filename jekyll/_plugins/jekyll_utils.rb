module Jekyll
  module Utils
    # HACK: Override Jekyll 3.x change to parse_date, to not converting
    # parsed dates to the local timezone, which discards the writing location
    # of timezones.
    #
    # Parse a date/time and throw an error if invalid
    #
    # input - the date/time to parse
    # msg - (optional) the error message to show the user
    #
    # Returns the parsed date if successful, throws a FatalException if not
    def parse_date(input, msg = "Input could not be parsed.")
      Time.parse(input)
    rescue ArgumentError
      raise Errors::InvalidDateError, "Invalid date '#{input}': #{msg}"
    end
  end
end
