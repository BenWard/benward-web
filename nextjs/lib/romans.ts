/**
 * Convert an integer to Roman numerals.
 * Port of the Jekyll romans.rb plugin.
 */

const NUMERALS: [string, number][] = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

export function romanize(year: number): string {
  let remaining = Math.floor(year);
  let result = "";

  for (const [numeral, value] of NUMERALS) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
}
