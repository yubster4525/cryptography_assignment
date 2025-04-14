/**
 * Hill Cipher implementation
 * A polygraphic substitution cipher based on linear algebra.
 * Each block of letters is multiplied by an invertible matrix (the key),
 * modulo 26, to produce the ciphertext.
 */

// Helper function to convert a letter to its corresponding number (A=0, B=1, etc.)
function letterToNumber(letter) {
  return letter.toUpperCase().charCodeAt(0) - 65;
}

// Helper function to convert a number back to a letter (0=A, 1=B, etc.)
function numberToLetter(number) {
  // Ensure the number is within range 0-25
  number = ((number % 26) + 26) % 26;
  return String.fromCharCode(number + 65);
}

// Matrix multiplication (vector × matrix) modulo 26
function multiplyMatrixVector(matrix, vector, modulus = 26) {
  const size = matrix.length;
  const result = new Array(size).fill(0);
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      result[i] = (result[i] + matrix[i][j] * vector[j]) % modulus;
    }
  }
  
  return result;
}

// Calculate the determinant of a 2×2 matrix
function determinant2x2(matrix) {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

// Calculate the modular multiplicative inverse of a number
function modInverse(a, m) {
  // Ensure a is positive
  a = ((a % m) + m) % m;
  
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  
  return 1; // Default fallback (shouldn't reach here if key is valid)
}

// Find the adjugate of a 2×2 matrix
function adjugate2x2(matrix) {
  return [
    [matrix[1][1], -matrix[0][1]],
    [-matrix[1][0], matrix[0][0]]
  ];
}

// Calculate the inverse of a 2×2 matrix modulo 26
function inverseMatrix2x2(matrix) {
  const det = determinant2x2(matrix);
  const detMod26 = ((det % 26) + 26) % 26;
  
  // Check if the determinant is invertible modulo 26
  // The determinant must be coprime with 26
  if (detMod26 === 0 || gcd(detMod26, 26) !== 1) {
    throw new Error("Matrix is not invertible modulo 26. The determinant must be coprime with 26.");
  }
  
  const detInverse = modInverse(detMod26, 26);
  const adj = adjugate2x2(matrix);
  
  // Calculate the inverse matrix elements modulo 26
  return [
    [((adj[0][0] * detInverse) % 26 + 26) % 26, ((adj[0][1] * detInverse) % 26 + 26) % 26],
    [((adj[1][0] * detInverse) % 26 + 26) % 26, ((adj[1][1] * detInverse) % 26 + 26) % 26]
  ];
}

// Calculate the greatest common divisor of two numbers
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Encrypt a message using the Hill cipher
 * @param {string} plaintext - The text to encrypt
 * @param {Array<Array<number>>} keyMatrix - The key matrix (must be square)
 * @returns {string} The encrypted text
 */
function hillEncrypt(plaintext, keyMatrix) {
  // Get matrix size
  const size = keyMatrix.length;
  
  // Remove non-alphabetic characters and convert to uppercase
  const sanitizedText = plaintext.replace(/[^a-zA-Z]/g, '').toUpperCase();
  
  // Ensure the plaintext length is a multiple of the key size by padding if necessary
  let paddedText = sanitizedText;
  const remainder = sanitizedText.length % size;
  
  if (remainder > 0) {
    paddedText += 'X'.repeat(size - remainder);
  }
  
  let ciphertext = '';
  
  // Process the plaintext in blocks of size 'size'
  for (let i = 0; i < paddedText.length; i += size) {
    // Convert the current block of letters to numbers
    const block = [];
    for (let j = 0; j < size; j++) {
      block.push(letterToNumber(paddedText[i + j]));
    }
    
    // Multiply the block by the key matrix
    const encryptedBlock = multiplyMatrixVector(keyMatrix, block);
    
    // Convert the numbers back to letters and add to ciphertext
    for (let j = 0; j < size; j++) {
      ciphertext += numberToLetter(encryptedBlock[j]);
    }
  }
  
  return ciphertext;
}

/**
 * Decrypt a message encrypted with the Hill cipher
 * @param {string} ciphertext - The encrypted text
 * @param {Array<Array<number>>} keyMatrix - The key matrix (must be square)
 * @returns {string} The decrypted text
 */
function hillDecrypt(ciphertext, keyMatrix) {
  const size = keyMatrix.length;
  
  // Validate key matrix dimensions
  if (size !== keyMatrix[0].length) {
    throw new Error("Key matrix must be square");
  }
  
  // For now, only support 2x2 matrices for decryption
  if (size !== 2) {
    throw new Error("This implementation only supports 2x2 matrices for decryption");
  }
  
  // Calculate the inverse key matrix
  const inverseKey = inverseMatrix2x2(keyMatrix);
  
  // Remove non-alphabetic characters and convert to uppercase
  const sanitizedText = ciphertext.replace(/[^a-zA-Z]/g, '').toUpperCase();
  
  let plaintext = '';
  
  // Process the ciphertext in blocks of size 'size'
  for (let i = 0; i < sanitizedText.length; i += size) {
    // Convert the current block of letters to numbers
    const block = [];
    for (let j = 0; j < size && (i + j) < sanitizedText.length; j++) {
      block.push(letterToNumber(sanitizedText[i + j]));
    }
    
    // If the block is incomplete (at the end of the text), pad with 'X'
    while (block.length < size) {
      block.push(letterToNumber('X'));
    }
    
    // Multiply the block by the inverse key matrix
    const decryptedBlock = multiplyMatrixVector(inverseKey, block);
    
    // Convert the numbers back to letters and add to plaintext
    for (let j = 0; j < size; j++) {
      plaintext += numberToLetter(decryptedBlock[j]);
    }
  }
  
  return plaintext;
}

module.exports = { hillEncrypt, hillDecrypt };