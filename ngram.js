/**
 * N-Gram Operations for Cryptography
 * This module provides functions to work with n-grams (sequences of n items)
 * from text, which are useful for cryptanalysis and other cryptographic operations.
 */

/**
 * Generate n-grams from a string
 * @param {string} text - The input text
 * @param {number} n - The size of each n-gram
 * @param {boolean} [overlap=true] - Whether n-grams should overlap
 * @returns {string[]} Array of n-grams
 */
function generateNgrams(text, n, overlap = true) {
  if (n <= 0) {
    throw new Error("N-gram size must be positive");
  }
  
  const result = [];
  const step = overlap ? 1 : n;
  
  // Remove whitespace for consistent n-gram generation
  const normalizedText = text.replace(/\s+/g, '');
  
  for (let i = 0; i <= normalizedText.length - n; i += step) {
    result.push(normalizedText.substring(i, i + n));
  }
  
  return result;
}

/**
 * Count frequency of each n-gram in a string
 * @param {string} text - The input text
 * @param {number} n - The size of each n-gram
 * @returns {Object} Object mapping n-grams to their occurrence count
 */
function ngramFrequency(text, n) {
  const ngrams = generateNgrams(text, n);
  const frequency = {};
  
  ngrams.forEach(ngram => {
    frequency[ngram] = (frequency[ngram] || 0) + 1;
  });
  
  return frequency;
}

/**
 * Sort n-grams by frequency
 * @param {Object} ngramFreq - Object mapping n-grams to counts
 * @returns {Array} Array of [ngram, count] pairs sorted by count (descending)
 */
function sortByFrequency(ngramFreq) {
  return Object.entries(ngramFreq)
    .sort((a, b) => b[1] - a[1]);
}

/**
 * Calculate Index of Coincidence (IC) for a text
 * Useful for determining whether a cipher is monoalphabetic or polyalphabetic
 * @param {string} text - The input text
 * @returns {number} The Index of Coincidence
 */
function calculateIC(text) {
  // Remove non-alphabetic characters and convert to uppercase
  const normalizedText = text.replace(/[^a-zA-Z]/g, '').toUpperCase();
  const length = normalizedText.length;
  
  if (length <= 1) return 0;
  
  // Count frequency of each letter
  const frequencies = {};
  for (let i = 0; i < length; i++) {
    const char = normalizedText[i];
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  
  // Calculate sum of frequencies * (frequencies - 1)
  let sum = 0;
  Object.values(frequencies).forEach(freq => {
    sum += freq * (freq - 1);
  });
  
  // IC = sum / (n * (n - 1))
  return sum / (length * (length - 1));
}

/**
 * Find repeated n-grams in text with their positions
 * Useful for cryptanalysis of Vigenere and similar ciphers
 * @param {string} text - The input text
 * @param {number} minLength - Minimum length of n-gram to detect
 * @param {number} maxLength - Maximum length of n-gram to detect
 * @returns {Object} Object mapping repeated n-grams to arrays of start positions
 */
function findRepeatedNgrams(text, minLength = 3, maxLength = 5) {
  const normalizedText = text.replace(/\s+/g, '');
  const repeated = {};
  
  // Check each possible n-gram length
  for (let n = minLength; n <= maxLength; n++) {
    const seen = {};
    
    // Find all occurrences of each n-gram
    for (let i = 0; i <= normalizedText.length - n; i++) {
      const ngram = normalizedText.substring(i, i + n);
      
      if (!seen[ngram]) {
        seen[ngram] = [i];
      } else {
        seen[ngram].push(i);
      }
    }
    
    // Filter to only repeated n-grams
    Object.entries(seen).forEach(([ngram, positions]) => {
      if (positions.length > 1) {
        repeated[ngram] = positions;
      }
    });
  }
  
  return repeated;
}

module.exports = {
  generateNgrams,
  ngramFrequency,
  sortByFrequency,
  calculateIC,
  findRepeatedNgrams
};