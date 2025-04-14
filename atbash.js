/**
 * Atbash Cipher implementation
 * A substitution cipher where each letter is replaced by its mirror
 * (A becomes Z, B becomes Y, etc.)
 */

function atbashEncrypt(plaintext) {
  return plaintext
    .split('')
    .map(char => {
      // Check if character is a letter
      if (/[a-zA-Z]/.test(char)) {
        const code = char.charCodeAt(0);
        
        // Handle uppercase letters (ASCII 65-90)
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(155 - code); // 155 = 65 + 90
        }
        
        // Handle lowercase letters (ASCII 97-122)
        if (code >= 97 && code <= 122) {
          return String.fromCharCode(219 - code); // 219 = 97 + 122
        }
      }
      
      // Return non-alphabetic characters unchanged
      return char;
    })
    .join('');
}

// Encryption and decryption are the same in Atbash
const atbashDecrypt = atbashEncrypt;

module.exports = { atbashEncrypt, atbashDecrypt };