function escapeRegExp(str:string) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function stringToRegExp(str:string) {
  str = escapeRegExp(str);
  return new RegExp(str, 'ig'); //g is needed?
}

//removes trailing whitespaces between words, and at the beginning and end
export function normalizeString(str:string) {
  return str.trim().split(/ {1,}/).join(' ')
}