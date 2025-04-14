/**
 * Affine Cipher implementation
 * A substitution cipher where each letter is mapped to its numeric equivalent,
 * encrypted using a mathematical function, and converted back to a letter.
 * Formula: E(x) = (ax + b) mod m
 * Where:
 *  - a and b are keys (a must be coprime with m)
 *  - m is the size of the alphabet (26 for English)
 */

// Extended Euclidean Algorithm to find modular multiplicative inverse
function modInverse(a, m) {
  // Ensure a is positive
  a = ((a % m) + m) % m;
  
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return 1; // Default value if no inverse exists
}

// Check if two numbers are coprime (gcd = 1)
function isCoprime(a, b) {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  return gcd(a, b) === 1;
}

function affineEncrypt(plaintext, a, b) {
  // Ensure a is coprime with 26 (alphabet size)
  if (!isCoprime(a, 26)) {
    throw new Error("Parameter 'a' must be coprime with 26");
  }
  
  return plaintext
    .split('')
    .map(char => {
      if (/[a-zA-Z]/.test(char)) {
        const code = char.charCodeAt(0);
        
        // Handle uppercase letters
        if (code >= 65 && code <= 90) {
          // Convert A-Z to 0-25, apply formula, convert back
          const x = code - 65;
          const encrypted = ((a * x + b) % 26) + 65;
          return String.fromCharCode(encrypted);
        }
        
        // Handle lowercase letters
        if (code >= 97 && code <= 122) {
          const x = code - 97;
          const encrypted = ((a * x + b) % 26) + 97;
          return String.fromCharCode(encrypted);
        }
      }
      
      return char;
    })
    .join('');
}

function affineDecrypt(ciphertext, a, b) {
  // Ensure a is coprime with 26
  if (!isCoprime(a, 26)) {
    throw new Error("Parameter 'a' must be coprime with 26");
  }
  
  // Find modular multiplicative inverse of a
  const aInverse = modInverse(a, 26);
  
  return ciphertext
    .split('')
    .map(char => {
      if (/[a-zA-Z]/.test(char)) {
        const code = char.charCodeAt(0);
        
        // Handle uppercase letters
        if (code >= 65 && code <= 90) {
          // Decryption formula: D(y) = a^-1 * (y - b) mod 26
          const y = code - 65;
          let decrypted = aInverse * (y - b) % 26;
          // Ensure positive modulo result
          decrypted = ((decrypted % 26) + 26) % 26;
          return String.fromCharCode(decrypted + 65);
        }
        
        // Handle lowercase letters
        if (code >= 97 && code <= 122) {
          const y = code - 97;
          let decrypted = aInverse * (y - b) % 26;
          // Ensure positive modulo result
          decrypted = ((decrypted % 26) + 26) % 26;
          return String.fromCharCode(decrypted + 97);
        }
      }
      
      return char;
    })
    .join('');
}

module.exports = { affineEncrypt, affineDecrypt };