/**
 * Caesar Cipher implementation
 * Simple substitution cipher where each letter is shifted by a fixed amount
 */

function caesarEncrypt(plaintext, shift) {
  // Normalize shift to be within 0-25
  shift = ((shift % 26) + 26) % 26;
  
  return plaintext
    .split('')
    .map(char => {
      // Check if character is a letter
      if (/[a-zA-Z]/.test(char)) {
        // Get ASCII code
        const code = char.charCodeAt(0);
        
        // Handle uppercase letters (ASCII 65-90)
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        
        // Handle lowercase letters (ASCII 97-122)
        if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
      }
      
      // Return non-alphabetic characters unchanged
      return char;
    })
    .join('');
}

function caesarDecrypt(ciphertext, shift) {
  // Decryption is just encryption with the negative shift
  return caesarEncrypt(ciphertext, 26 - shift);
}

module.exports = { caesarEncrypt, caesarDecrypt };