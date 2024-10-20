const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const padString = (input) => (6 - input.length % 6) == 6 ? input : input + "b".repeat(6 - input.length % 6);
const stringToBinary = (input) => input.replace(/a/g, "0").replace(/b/g, "1");
const binaryToDecimal = (input) => parseInt(input, 2);
const decimalToBase64 = (input) => base64Chars[input];
const base64ToDecimal = (input) => base64Chars.indexOf(input);
const decimalToBinary = (input, bitSize) => input.toString(2).padStart(bitSize, "0");
const chunkString = (input) => input.match(/.{6}/g) ?? [];

export function compressString(inputString) {
  // inputString will be a string made of a or b characters (i.e., the kts answers)
  // need to pad string to be a multiple of 6 since base64 uses 6-bit characters
  const paddedString = padString(inputString);
  return chunkString(paddedString)
    .map((input) => stringToBinary(input))
    .map(input => binaryToDecimal(input))
    .map(input => decimalToBase64(input))
    .join("")
}

export function decompressString(compressedInput, originalInputLength = 70) {
  return compressedInput
    .split("")
    .map(input => base64ToDecimal(input))
    .map(input => decimalToBinary(input, 6))
    .join("")
    .replace(/0/g, "a")
    .replace(/1/g, "b")
    .slice(0, originalInputLength)
}