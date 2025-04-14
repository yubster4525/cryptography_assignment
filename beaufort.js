/**
 * Beaufort Cipher implementation
 * A reciprocal substitution cipher (encryption and decryption are the same operation)
 * Similar to Vigenere but with a different formula: C = (K - P) mod 26
 */

function beaufortCipher(text, keyword) {
  const result = [];
  let keyIndex = 0;
  
  // Ensure keyword only contains letters and convert to uppercase
  const sanitizedKey = keyword.replace(/[^a-zA-Z]/g, '').toUpperCase();
  if (sanitizedKey.length === 0) {
    throw new Error("Keyword must contain at least one letter");
  }
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    // Process only alphabetic characters
    if (/[a-zA-Z]/.test(char)) {
      // Get the key character value (0-25)
      const keyChar = sanitizedKey.charCodeAt(keyIndex % sanitizedKey.length) - 65;
      
      // Get the character code
      const code = char.charCodeAt(0);
      
      if (code >= 65 && code <= 90) {
        // For uppercase: beaufort formula (K - P) mod 26
        const encrypted = ((keyChar - (code - 65) + 26) % 26) + 65;
        result.push(String.fromCharCode(encrypted));
      } 
      else if (code >= 97 && code <= 122) {
        // For lowercase: convert to uppercase for calculation, then back to lowercase
        const encrypted = ((keyChar - (code - 97) + 26) % 26) + 97;
        result.push(String.fromCharCode(encrypted));
      }
      
      // Move to the next key character
      keyIndex++;
    } else {
      // Non-alphabetic characters remain unchanged
      result.push(char);
    }
  }
  
  return result.join('');
}

// Beaufort cipher is reciprocal, so encryption and decryption are the same operation
const beaufortEncrypt = beaufortCipher;
const beaufortDecrypt = beaufortCipher;

module.exports = { beaufortEncrypt, beaufortDecrypt };