/**
 * Vigenere Cipher implementation
 * A polyalphabetic substitution cipher that uses a keyword to determine
 * different shift values for each letter in the plaintext.
 */

function vigenereEncrypt(plaintext, keyword) {
  const result = [];
  let keyIndex = 0;
  
  // Ensure keyword only contains letters and convert to uppercase
  const sanitizedKey = keyword.replace(/[^a-zA-Z]/g, '').toUpperCase();
  if (sanitizedKey.length === 0) {
    throw new Error("Keyword must contain at least one letter");
  }
  
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    
    // Process only alphabetic characters
    if (/[a-zA-Z]/.test(char)) {
      // Get the shift value from the current keyword character (0-25)
      const shift = sanitizedKey.charCodeAt(keyIndex % sanitizedKey.length) - 65;
      
      // Get the character code
      const code = char.charCodeAt(0);
      
      // Encrypt uppercase letter
      if (code >= 65 && code <= 90) {
        result.push(String.fromCharCode(((code - 65 + shift) % 26) + 65));
      } 
      // Encrypt lowercase letter
      else if (code >= 97 && code <= 122) {
        result.push(String.fromCharCode(((code - 97 + shift) % 26) + 97));
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

function vigenereDecrypt(ciphertext, keyword) {
  const result = [];
  let keyIndex = 0;
  
  // Ensure keyword only contains letters and convert to uppercase
  const sanitizedKey = keyword.replace(/[^a-zA-Z]/g, '').toUpperCase();
  if (sanitizedKey.length === 0) {
    throw new Error("Keyword must contain at least one letter");
  }
  
  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext[i];
    
    // Process only alphabetic characters
    if (/[a-zA-Z]/.test(char)) {
      // Get the shift value from the current keyword character (0-25)
      const shift = sanitizedKey.charCodeAt(keyIndex % sanitizedKey.length) - 65;
      
      // Get the character code
      const code = char.charCodeAt(0);
      
      // Decrypt uppercase letter
      if (code >= 65 && code <= 90) {
        result.push(String.fromCharCode(((code - 65 - shift + 26) % 26) + 65));
      } 
      // Decrypt lowercase letter
      else if (code >= 97 && code <= 122) {
        result.push(String.fromCharCode(((code - 97 - shift + 26) % 26) + 97));
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

module.exports = { vigenereEncrypt, vigenereDecrypt };