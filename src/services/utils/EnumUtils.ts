export class EnumUtils {
  static getKey(enumObj, value) {
    return Object.keys(enumObj).find(key => enumObj[key] === value);
  }
}
