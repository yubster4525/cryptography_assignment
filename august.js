/**
 * ADFGVX Cipher implementation (also known as August Cipher)
 * A fractionated substitution cipher combining a Polybius square with 
 * columnar transposition for additional security.
 */

function augustEncrypt(plaintext, keyword, polybius = null) {
  // Default Polybius square if none provided (6x6 grid with A-Z and 0-9)
  const defaultPolybius = [
    ['A', 'D', 'F', 'G', 'V', 'X'],
    ['A', 'A', 'B', 'C', 'D', 'E'],
    ['D', 'F', 'G', 'H', 'I', 'J'],
    ['F', 'K', 'L', 'M', 'N', 'O'],
    ['G', 'P', 'Q', 'R', 'S', 'T'],
    ['V', 'U', 'V', 'W', 'X', 'Y'],
    ['X', 'Z', '0', '1', '2', '3']
  ];
  
  const polybiusSquare = polybius || defaultPolybius;
  const labels = polybiusSquare[0]; // A, D, F, G, V, X
  
  // Step 1: Convert plaintext to fractionated form using the Polybius square
  let fractionated = '';
  
  // Remove spaces and convert to uppercase
  const sanitizedText = plaintext.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  
  for (let i = 0; i < sanitizedText.length; i++) {
    const char = sanitizedText[i];
    let found = false;
    
    // Search for the character in the Polybius square
    for (let row = 1; row < polybiusSquare.length; row++) {
      for (let col = 0; col < polybiusSquare[row].length; col++) {
        if (polybiusSquare[row][col] === char) {
          // Add the coordinates as fractionated form
          fractionated += labels[row - 1]; // Row label
          fractionated += labels[col]; // Column label
          found = true;
          break;
        }
      }
      if (found) break;
    }
    
    // If character not found in the square, skip it
    if (!found) {
      console.warn(`Character "${char}" not found in Polybius square and was skipped.`);
    }
  }
  
  // Step 2: Apply columnar transposition using the keyword
  if (!keyword || keyword.length === 0) {
    throw new Error("Keyword must not be empty");
  }
  
  // Remove non-alphabetic characters from the keyword
  const sanitizedKey = keyword.replace(/[^a-zA-Z]/g, '').toUpperCase();
  
  if (sanitizedKey.length === 0) {
    throw new Error("Keyword must contain at least one letter");
  }
  
  // Create numeric key based on keyword letter positions in alphabet
  const keyValues = [];
  for (let i = 0; i < sanitizedKey.length; i++) {
    keyValues.push({
      char: sanitizedKey[i],
      originalPosition: i
    });
  }
  
  // Sort the key values alphabetically
  keyValues.sort((a, b) => a.char.localeCompare(b.char));
  
  // Assign numeric values to the sorted key
  const numericKey = Array(sanitizedKey.length).fill(0);
  for (let i = 0; i < keyValues.length; i++) {
    numericKey[keyValues[i].originalPosition] = i;
  }
  
  // Calculate number of rows needed
  const numRows = Math.ceil(fractionated.length / sanitizedKey.length);
  
  // Create the transposition grid
  const grid = Array(numRows).fill(null).map(() => Array(sanitizedKey.length).fill(''));
  
  // Fill the grid with the fractionated text
  let charIndex = 0;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < sanitizedKey.length; col++) {
      if (charIndex < fractionated.length) {
        grid[row][col] = fractionated[charIndex++];
      }
    }
  }
  
  // Read off the columns in the order specified by the numeric key
  let ciphertext = '';
  for (let i = 0; i < sanitizedKey.length; i++) {
    // Find the column with the current key value
    const col = numericKey.indexOf(i);
    
    // Read down this column
    for (let row = 0; row < numRows; row++) {
      if (grid[row][col] !== '') {
        ciphertext += grid[row][col];
      }
    }
  }
  
  return ciphertext;
}

function augustDecrypt(ciphertext, keyword, polybius = null) {
  // Default Polybius square if none provided (6x6 grid with A-Z and 0-9)
  const defaultPolybius = [
    ['A', 'D', 'F', 'G', 'V', 'X'],
    ['A', 'A', 'B', 'C', 'D', 'E'],
    ['D', 'F', 'G', 'H', 'I', 'J'],
    ['F', 'K', 'L', 'M', 'N', 'O'],
    ['G', 'P', 'Q', 'R', 'S', 'T'],
    ['V', 'U', 'V', 'W', 'X', 'Y'],
    ['X', 'Z', '0', '1', '2', '3']
  ];
  
  const polybiusSquare = polybius || defaultPolybius;
  const labels = polybiusSquare[0]; // A, D, F, G, V, X
  
  // Step 1: Reverse the columnar transposition
  if (!keyword || keyword.length === 0) {
    throw new Error("Keyword must not be empty");
  }
  
  // Remove non-alphabetic characters from the keyword
  const sanitizedKey = keyword.replace(/[^a-zA-Z]/g, '').toUpperCase();
  
  if (sanitizedKey.length === 0) {
    throw new Error("Keyword must contain at least one letter");
  }
  
  // Create numeric key based on keyword letter positions in alphabet
  const keyValues = [];
  for (let i = 0; i < sanitizedKey.length; i++) {
    keyValues.push({
      char: sanitizedKey[i],
      originalPosition: i
    });
  }
  
  // Sort the key values alphabetically
  keyValues.sort((a, b) => a.char.localeCompare(b.char));
  
  // Assign numeric values to the sorted key
  const numericKey = Array(sanitizedKey.length).fill(0);
  for (let i = 0; i < keyValues.length; i++) {
    numericKey[keyValues[i].originalPosition] = i;
  }
  
  // Calculate number of rows needed
  const numRows = Math.ceil(ciphertext.length / sanitizedKey.length);
  
  // Calculate the total number of cells in the grid
  const totalCells = numRows * sanitizedKey.length;
  
  // Calculate how many cells are empty (in the last row)
  const emptyCells = totalCells - ciphertext.length;
  
  // Calculate column lengths (all start with the maximum length)
  const colLengths = Array(sanitizedKey.length).fill(numRows);
  
  // Identify which columns have one fewer character
  // These are the rightmost columns in the original grid
  if (emptyCells > 0) {
    // Sort the columns by their original position
    const sortedColumns = Array.from({ length: sanitizedKey.length }, (_, i) => i)
      .sort((a, b) => a - b);
    
    // The last 'emptyCells' columns in original order will have one less character
    for (let i = 1; i <= emptyCells; i++) {
      const col = sortedColumns[sanitizedKey.length - i];
      colLengths[col]--;
    }
  }
  
  // Create the transposition grid
  const grid = Array(numRows).fill(null).map(() => Array(sanitizedKey.length).fill(''));
  
  // Fill the grid column by column according to the key
  let charIndex = 0;
  for (let i = 0; i < sanitizedKey.length; i++) {
    // Find the column with the current key value
    const col = numericKey.indexOf(i);
    
    // Fill this column
    for (let row = 0; row < colLengths[col]; row++) {
      if (charIndex < ciphertext.length) {
        grid[row][col] = ciphertext[charIndex++];
      }
    }
  }
  
  // Read the grid row by row to get the fractionated text
  let fractionated = '';
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < sanitizedKey.length; col++) {
      if (grid[row][col] !== '') {
        fractionated += grid[row][col];
      }
    }
  }
  
  // Step 2: Convert fractionated form back to plaintext using the Polybius square
  let plaintext = '';
  
  // Process pairs of coordinates
  for (let i = 0; i < fractionated.length; i += 2) {
    // If we don't have a complete pair, break
    if (i + 1 >= fractionated.length) break;
    
    const rowLabel = fractionated[i];
    const colLabel = fractionated[i + 1];
    
    // Find the row and column indices in the labels
    const rowIndex = labels.indexOf(rowLabel);
    const colIndex = labels.indexOf(colLabel);
    
    // If either label is not found, skip this pair
    if (rowIndex === -1 || colIndex === -1) {
      console.warn(`Invalid Polybius coordinates: ${rowLabel}${colLabel}`);
      continue;
    }
    
    // Get the character at the intersection
    // Add 1 to rowIndex since the first row of polybiusSquare contains labels
    if (polybiusSquare[rowIndex + 1] && polybiusSquare[rowIndex + 1][colIndex]) {
      plaintext += polybiusSquare[rowIndex + 1][colIndex];
    } else {
      console.warn(`No character found at Polybius coordinates: ${rowLabel}${colLabel}`);
    }
  }
  
  return plaintext;
}

module.exports = { augustEncrypt, augustDecrypt };