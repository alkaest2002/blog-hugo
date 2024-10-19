// base64 character set for encoding (64 characters)
const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

// function to convert the string to a binary format (a = 0, b = 1)
function stringToBinary(input) {
  return input.replace(/a/g, '0').replace(/b/g, '1');
}

// function to group the binary string into chunks of groupSize bits
function groupBinaryString(binaryStr, groupSize) {
  let chunks = [];
  for (let i = 0; i < binaryStr.length; i += groupSize) {
    chunks.push(binaryStr.slice(i, i + groupSize));
  }
  return chunks;
}

// function to convert each binary chunk into a decimal number
function binaryToDecimal(binaryChunk) {
  return parseInt(binaryChunk, 2);
}

// function to convert decimal to Base64 using the Base64 character set
function decimalToBase64(decimal) {
  return base64Chars[decimal];
}

// function to decompress the Base64-encoded string back to the original 'a'/'b' string
function base64ToDecimal(base64Char) {
  return base64Chars.indexOf(base64Char);
}

// convert decimal to binary
function decimalToBinary(decimal, bitSize) {
  return decimal.toString(2).padStart(bitSize, '0');
}

// compress the input string
function compressString(input) {
  // convert the input string to a binary string
  let binaryString = stringToBinary(input);
  
  // group the binary string into chunks of 6 bits (since Base64 uses 6 bits per character)
  let binaryChunks = groupBinaryString(binaryString, 6);
  
  // convert each binary chunk into a decimal and then Base64 encode it
  let compressedString = binaryChunks.map(chunk => {
    let decimalValue = binaryToDecimal(chunk);
    return decimalToBase64(decimalValue);
  }).join('');
  
  // Handle padding if the binary string is not a multiple of 6
  const paddingLength = (6 - (binaryString.length % 6)) % 6;
  if (paddingLength > 0) {
    compressedString += '='.repeat(Math.ceil(paddingLength / 2)); // Adjust padding for Base64
  }

  // return compressed string
  return compressedString;
}

// decompress the compressed string
function decompressString(compressedStr) {
  // Remove padding
  compressedStr = compressedStr.replace(/=/g, '');

  let decompressedBinary = compressedStr.split('').map(char => {
    let decimalValue = base64ToDecimal(char);
    return decimalToBinary(decimalValue, 6); // Convert back to 6 bits
  }).join('');
  
  // convert binary string back to 'a'/'b' string and return
  // The final binary string may have additional padding zeros, so trim it accordingly
  return decompressedBinary.replace(/0/g, 'a').replace(/1/g, 'b').slice(0, original.length);
}