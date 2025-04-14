/**
 * Autokey Cipher implementation (Running Key Cipher variant)
 * A polyalphabetic substitution cipher where the key is derived from
 * the plaintext itself after an initial key priming value.
 */

function autokeyEncrypt(plaintext, primer) {
  // Ensure primer only contains letters and convert to uppercase
  const sanitizedPrimer = primer.replace(/[^a-zA-Z]/g, '').toUpperCase();
  
  if (sanitizedPrimer.length === 0) {
    throw new Error("Primer must contain at least one letter");
  }
  
  const result = [];
  const keyStream = sanitizedPrimer.split('');
  let keyIndex = 0;
  
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    
    // Process only alphabetic characters
    if (/[a-zA-Z]/.test(char)) {
      // Get the shift value from current key character
      const keyChar = keyStream[keyIndex];
      const shift = keyChar.charCodeAt(0) - 65; // Convert A-Z to 0-25
      
      // Get the character code
      const code = char.charCodeAt(0);
      let encryptedChar;
      
      // Encrypt uppercase letter
      if (code >= 65 && code <= 90) {
        encryptedChar = String.fromCharCode(((code - 65 + shift) % 26) + 65);
        // Add plaintext letter to keystream (must be uppercase)
        keyStream.push(char);
      } 
      // Encrypt lowercase letter
      else if (code >= 97 && code <= 122) {
        encryptedChar = String.fromCharCode(((code - 97 + shift) % 26) + 97);
        // Add plaintext letter to keystream (convert to uppercase)
        keyStream.push(char.toUpperCase());
      }
      
      result.push(encryptedChar);
      keyIndex++;
    } else {
      // Non-alphabetic characters remain unchanged
      result.push(char);
    }
  }
  
  return result.join('');
}

function autokeyDecrypt(ciphertext, primer) {
  // Ensure primer only contains letters and convert to uppercase
  const sanitizedPrimer = primer.replace(/[^a-zA-Z]/g, '').toUpperCase();
  
  if (sanitizedPrimer.length === 0) {
    throw new Error("Primer must contain at least one letter");
  }
  
  const result = [];
  const keyStream = sanitizedPrimer.split('');
  let keyIndex = 0;
  
  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext[i];
    
    // Process only alphabetic characters
    if (/[a-zA-Z]/.test(char)) {
      // Get the shift value from current key character
      const keyChar = keyStream[keyIndex];
      const shift = keyChar.charCodeAt(0) - 65; // Convert A-Z to 0-25
      
      // Get the character code
      const code = char.charCodeAt(0);
      let decryptedChar;
      
      // Decrypt uppercase letter
      if (code >= 65 && code <= 90) {
        // Decryption formula with proper modulo
        const decryptedCode = ((code - 65 - shift + 26) % 26) + 65;
        decryptedChar = String.fromCharCode(decryptedCode);
        // Add decrypted letter to keystream (must be uppercase)
        keyStream.push(decryptedChar);
      } 
      // Decrypt lowercase letter
      else if (code >= 97 && code <= 122) {
        // Decryption formula with proper modulo
        const decryptedCode = ((code - 97 - shift + 26) % 26) + 97;
        decryptedChar = String.fromCharCode(decryptedCode);
        // Add decrypted letter to keystream (convert to uppercase)
        keyStream.push(decryptedChar.toUpperCase());
      }
      
      result.push(decryptedChar);
      keyIndex++;
    } else {
      // Non-alphabetic characters remain unchanged
      result.push(char);
    }
  }
  
  return result.join('');
}

module.exports = { autokeyEncrypt, autokeyDecrypt };