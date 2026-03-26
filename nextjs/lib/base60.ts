/**
 * NewBase60 encoding for shortlink generation.
 * Port of the Ruby new_base_60 gem.
 * See: http://tantek.pbworks.com/w/page/19402946/NewBase60
 */

const CHARSET = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz";

export function encodeBase60(n: number): string {
  if (n === 0) return "0";

  let num = Math.floor(n);
  let result = "";

  while (num > 0) {
    result = CHARSET[num % 60] + result;
    num = Math.floor(num / 60);
  }

  return result;
}

export function shortlink(dateStr: string, shortdomain: string): string {
  const timestamp = Math.floor(new Date(dateStr).getTime() / 1000);
  return `${shortdomain}/${encodeBase60(timestamp)}`;
}
