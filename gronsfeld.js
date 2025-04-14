/**
 * Gronsfeld Cipher implementation
 * A variant of the Vigenere cipher that uses numbers instead of letters as the key.
 * Each digit in the key represents a shift value.
 */

function gronsfeldEncrypt(plaintext, numericKey) {
  const result = [];
  let keyIndex = 0;
  
  // Convert string key to array of digits
  const keyDigits = String(numericKey).split('').map(digit => parseInt(digit, 10));
  
  if (keyDigits.length === 0) {
    throw new Error("Key must contain at least one digit");
  }
  
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    
    // Process only alphabetic characters
    if (/[a-zA-Z]/.test(char)) {
      // Get the shift value from the current key digit (0-9)
      const shift = keyDigits[keyIndex % keyDigits.length];
      
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
      
      // Move to the next key digit
      keyIndex++;
    } else {
      // Non-alphabetic characters remain unchanged
      result.push(char);
    }
  }
  
  return result.join('');
}

function gronsfeldDecrypt(ciphertext, numericKey) {
  const result = [];
  let keyIndex = 0;
  
  // Convert string key to array of digits
  const keyDigits = String(numericKey).split('').map(digit => parseInt(digit, 10));
  
  if (keyDigits.length === 0) {
    throw new Error("Key must contain at least one digit");
  }
  
  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext[i];
    
    // Process only alphabetic characters
    if (/[a-zA-Z]/.test(char)) {
      // Get the shift value from the current key digit (0-9)
      const shift = keyDigits[keyIndex % keyDigits.length];
      
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
      
      // Move to the next key digit
      keyIndex++;
    } else {
      // Non-alphabetic characters remain unchanged
      result.push(char);
    }
  }
  
  return result.join('');
}

module.exports = { gronsfeldEncrypt, gronsfeldDecrypt };