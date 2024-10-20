const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const padString = input => (6 - input.length % 6) == 6 ? input : input + "b".repeat(6 - input.length % 6);
const chunkString = input => input.match(/.{6}/g) ?? [];
const stringToBinary = input => input.replace(/a/g, "0").replace(/b/g, "1");
const binaryToDecimal = input => parseInt(input, 2);
const decimalToBase64 = input => base64Chars[input];
const base64ToDecimal = input => base64Chars.indexOf(input);
const decimalToBinary = input => input.toString(2).padStart(6, "0");
const binaryToString = input => input.replace(/0/gi, "a").replace(/1/gi, "b");

export function compressString(inputString) {
  // inputString (already sanitized) will be a sequence of 70 "a" or "b" characters (i.e., the kts answers)
  // need to pad inputString to make it a multiple of 6 since base64 uses 6-bit characters
  const paddedString = padString(inputString);
  return chunkString(paddedString)
    .map(input => stringToBinary(input))
    .map(input => binaryToDecimal(input))
    .map(input => decimalToBase64(input))
    .join("")
}

export function decompressString(compressedInput, originalInputLength = 70) {
  return compressedInput
    .split("")
    .map(input => base64ToDecimal(input))
    .map(input => decimalToBinary(input))
    .map(input => binaryToString(input))
    .join("")
    .slice(0, originalInputLength)
}