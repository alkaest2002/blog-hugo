const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const stringToBinary = (input) => input.replace(/a/g, "0").replace(/b/g, "1");
const binaryToDecimal = (binaryChunk) => parseInt(binaryChunk, 2);
const decimalToBase64 = (decimal) => base64Chars[decimal];
const base64ToDecimal = (base64Char) => base64Chars.indexOf(base64Char);
const decimalToBinary = (decimal, bitSize) => decimal.toString(2).padStart(bitSize, "0");
const groupBinaryString = (binaryStr, groupSize) => {
  const numberOfChunks = Math.ceil(binaryStr.length / groupSize);
  let chuncks = Array.from({ length: numberOfChunks });
  return chuncks.map((_, index) => binaryStr.slice(index*groupSize, (index+1)*groupSize));
}

export function compressString(input) {
  // base64 uses 6 bits per character
	// pad input with b so that it's length is a multiple of 6
  input += "b".repeat(6 - input.length % 6);
  // convert input into binary
  const binaryString = stringToBinary(input);
  // chunk binary
  const binaryChunks = groupBinaryString(binaryString, 6);
  // convert each binary chunk into a decimal and then base64 encode it
  return binaryChunks
    .map(input => binaryToDecimal(input))
    .map(input => decimalToBase64(input))
    .join("");
}

export function decompressString(compressedStr, originalStringLength = 70) {
  return compressedStr
    .split("")
    .map(input => base64ToDecimal(input))
    .map(input => decimalToBinary(input, 6))
    .join("")
    .replace(/0/g, "a")
    .replace(/1/g, "b")
    .slice(0, originalStringLength)
}