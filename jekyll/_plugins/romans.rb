module Jekyll
  module RomanNumerals
    def romanize(year, numerals=false)
      numerals = numerals || {
          'M' => 1000,
          'CM' => 900,
          'D' => 500,
          'CD' => 400,
          'C' => 100,
          'XC' => 90,
          'L' => 50,
          'XL' => 40,
          'X' => 10,
          'IX' => 9,
          'V' => 5,
          'IV' => 4,
          'I' => 1
        }
      year = year.to_i

      if year > 0 && numerals.length == 0
        throw :total_math_meltdown_whut
      elsif year == 0
        return ""
      end

      roman = ""
      current = numerals.shift
      count = year / current[1]

      if count > 0
        count.times { roman << current[0] }
        year -= count * current[1]
      end
      return roman + romanize(year, numerals)
    end

  end
end

Liquid::Template.register_filter(Jekyll::RomanNumerals)
