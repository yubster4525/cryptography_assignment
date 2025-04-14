/**
 * Myszkowski Transposition Cipher implementation
 * A variant of columnar transposition where columns with the same letter in the key
 * are taken in order of appearance.
 */

function myszkowskiEncrypt(plaintext, keyword) {
  if (!keyword || keyword.length === 0) {
    throw new Error("Keyword must not be empty");
  }
  
  // Remove non-alphabetic characters from the keyword and convert to uppercase
  const sanitizedKey = keyword.replace(/[^a-zA-Z]/g, '').toUpperCase();
  
  if (sanitizedKey.length === 0) {
    throw new Error("Keyword must contain at least one letter");
  }
  
  // Create an array of key-value pairs where key is the letter and value is the position
  const keyLetters = [...sanitizedKey].map((letter, index) => ({ letter, index }));
  
  // Sort the key letters alphabetically, but maintain original indices
  keyLetters.sort((a, b) => a.letter.localeCompare(b.letter));
  
  // Assign ranks to the key letters
  // Letters that are the same get the same rank
  const ranks = Array(sanitizedKey.length).fill(0);
  let currentRank = 0;
  
  for (let i = 0; i < keyLetters.length; i++) {
    const currentIndex = keyLetters[i].index;
    
    if (i > 0 && keyLetters[i].letter !== keyLetters[i - 1].letter) {
      currentRank++;
    }
    
    ranks[currentIndex] = currentRank;
  }
  
  // Create a grid to hold the plaintext
  // Calculate number of rows needed
  const numRows = Math.ceil(plaintext.length / sanitizedKey.length);
  const grid = Array(numRows).fill(null).map(() => Array(sanitizedKey.length).fill(''));
  
  // Fill the grid with plaintext
  let textIndex = 0;
  for (let row = 0; row < numRows && textIndex < plaintext.length; row++) {
    for (let col = 0; col < sanitizedKey.length && textIndex < plaintext.length; col++) {
      grid[row][col] = plaintext[textIndex++];
    }
  }
  
  // Read the columns according to the rank ordering
  // For each rank starting from 0
  let ciphertext = '';
  const maxRank = Math.max(...ranks);
  
  for (let rank = 0; rank <= maxRank; rank++) {
    // For each column with the current rank
    for (let col = 0; col < sanitizedKey.length; col++) {
      if (ranks[col] === rank) {
        // Read down this column
        for (let row = 0; row < numRows; row++) {
          if (grid[row][col] !== '') {
            ciphertext += grid[row][col];
          }
        }
      }
    }
  }
  
  return ciphertext;
}

function myszkowskiDecrypt(ciphertext, keyword) {
  if (!keyword || keyword.length === 0) {
    throw new Error("Keyword must not be empty");
  }
  
  // Remove non-alphabetic characters from the keyword and convert to uppercase
  const sanitizedKey = keyword.replace(/[^a-zA-Z]/g, '').toUpperCase();
  
  if (sanitizedKey.length === 0) {
    throw new Error("Keyword must contain at least one letter");
  }
  
  // Create an array of key-value pairs where key is the letter and value is the position
  const keyLetters = [...sanitizedKey].map((letter, index) => ({ letter, index }));
  
  // Sort the key letters alphabetically, but maintain original indices
  keyLetters.sort((a, b) => a.letter.localeCompare(b.letter));
  
  // Assign ranks to the key letters
  // Letters that are the same get the same rank
  const ranks = Array(sanitizedKey.length).fill(0);
  let currentRank = 0;
  
  for (let i = 0; i < keyLetters.length; i++) {
    const currentIndex = keyLetters[i].index;
    
    if (i > 0 && keyLetters[i].letter !== keyLetters[i - 1].letter) {
      currentRank++;
    }
    
    ranks[currentIndex] = currentRank;
  }
  
  // Calculate number of rows needed
  const numRows = Math.ceil(ciphertext.length / sanitizedKey.length);
  
  // Calculate the number of filled positions in the grid
  const filledPositions = Math.min(ciphertext.length, numRows * sanitizedKey.length);
  
  // Calculate empty positions at the end of the grid
  const emptyPositions = (numRows * sanitizedKey.length) - filledPositions;
  
  // Calculate the column lengths - all columns have the same length initially
  const colLengths = Array(sanitizedKey.length).fill(numRows);
  
  // Adjust for empty positions at the end of the last row
  for (let i = 0; i < emptyPositions; i++) {
    colLengths[sanitizedKey.length - 1 - i]--;
  }
  
  // Create a grid to hold the plaintext
  const grid = Array(numRows).fill(null).map(() => Array(sanitizedKey.length).fill(''));
  
  // Calculate the starting position in the ciphertext for each rank of column
  const rankStartPos = Array(currentRank + 1).fill(0);
  let pos = 0;
  
  for (let rank = 0; rank <= currentRank; rank++) {
    rankStartPos[rank] = pos;
    
    // Calculate how many characters are in columns of this rank
    for (let col = 0; col < sanitizedKey.length; col++) {
      if (ranks[col] === rank) {
        pos += colLengths[col];
      }
    }
  }
  
  // Fill the grid column by column according to the ranks
  for (let col = 0; col < sanitizedKey.length; col++) {
    const rank = ranks[col];
    let startPos = rankStartPos[rank];
    
    // Update the start position for the next column with the same rank
    rankStartPos[rank] += colLengths[col];
    
    // Fill this column
    for (let row = 0; row < colLengths[col]; row++) {
      grid[row][col] = ciphertext[startPos + row];
    }
  }
  
  // Read the grid row by row to get the plaintext
  let plaintext = '';
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < sanitizedKey.length; col++) {
      if (grid[row][col]) {
        plaintext += grid[row][col];
      }
    }
  }
  
  return plaintext;
}

module.exports = { myszkowskiEncrypt, myszkowskiDecrypt };