/**
 * Route Cipher implementation
 * A transposition cipher where the plaintext is written into a grid 
 * and then read off following a specific pattern or route.
 */

/**
 * Encrypt a message using the Route cipher with a spiral route
 * @param {string} plaintext - The text to encrypt
 * @param {number} rows - Number of rows in the grid
 * @param {number} cols - Number of columns in the grid
 * @param {string} [route='spiral'] - The route type to use ('spiral', 'snake', 'diagonal')
 * @param {string} [direction='clockwise'] - Direction for spiral route ('clockwise', 'counter-clockwise')
 * @returns {string} The encrypted text
 */
function routeEncrypt(plaintext, rows, cols, route = 'spiral', direction = 'clockwise') {
  if (rows < 1 || cols < 1) {
    throw new Error("Number of rows and columns must be positive");
  }
  
  // Remove whitespace and non-alphabetic characters if needed
  const sanitizedText = plaintext.replace(/[^a-zA-Z0-9]/g, '');
  
  // Create the grid and fill it with the plaintext
  const grid = Array(rows).fill('').map(() => Array(cols).fill(''));
  let charIndex = 0;
  
  // Fill the grid row by row
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (charIndex < sanitizedText.length) {
        grid[row][col] = sanitizedText[charIndex++];
      } else {
        // Pad with 'X' if the text doesn't fill the grid
        grid[row][col] = 'X';
      }
    }
  }
  
  // Read the grid according to the specified route
  let result = '';
  
  switch (route.toLowerCase()) {
    case 'spiral':
      result = readSpiralRoute(grid, rows, cols, direction);
      break;
    case 'snake':
      result = readSnakeRoute(grid, rows, cols);
      break;
    case 'diagonal':
      result = readDiagonalRoute(grid, rows, cols);
      break;
    default:
      throw new Error("Unsupported route type. Use 'spiral', 'snake', or 'diagonal'");
  }
  
  return result;
}

/**
 * Decrypt a message encrypted with the Route cipher
 * @param {string} ciphertext - The encrypted text
 * @param {number} rows - Number of rows in the grid
 * @param {number} cols - Number of columns in the grid
 * @param {string} [route='spiral'] - The route type used ('spiral', 'snake', 'diagonal')
 * @param {string} [direction='clockwise'] - Direction for spiral route ('clockwise', 'counter-clockwise')
 * @returns {string} The decrypted text
 */
function routeDecrypt(ciphertext, rows, cols, route = 'spiral', direction = 'clockwise') {
  if (rows < 1 || cols < 1) {
    throw new Error("Number of rows and columns must be positive");
  }
  
  // Create an empty grid
  const grid = Array(rows).fill('').map(() => Array(cols).fill(''));
  
  // Calculate positions in the grid based on the route
  const positions = [];
  
  switch (route.toLowerCase()) {
    case 'spiral':
      positions.push(...getSpiralPositions(rows, cols, direction));
      break;
    case 'snake':
      positions.push(...getSnakePositions(rows, cols));
      break;
    case 'diagonal':
      positions.push(...getDiagonalPositions(rows, cols));
      break;
    default:
      throw new Error("Unsupported route type. Use 'spiral', 'snake', or 'diagonal'");
  }
  
  // Fill the grid with the ciphertext according to the route
  for (let i = 0; i < Math.min(ciphertext.length, positions.length); i++) {
    const [row, col] = positions[i];
    grid[row][col] = ciphertext[i];
  }
  
  // Read the grid row by row to get the plaintext
  let plaintext = '';
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      plaintext += grid[row][col] || '';
    }
  }
  
  return plaintext;
}

// Helper function to read the grid in a spiral route
function readSpiralRoute(grid, rows, cols, direction) {
  const positions = getSpiralPositions(rows, cols, direction);
  
  let result = '';
  for (const [row, col] of positions) {
    result += grid[row][col];
  }
  
  return result;
}

// Helper function to get positions in spiral order
function getSpiralPositions(rows, cols, direction) {
  const positions = [];
  
  let top = 0, bottom = rows - 1;
  let left = 0, right = cols - 1;
  
  if (direction.toLowerCase() === 'clockwise') {
    while (top <= bottom && left <= right) {
      // Move from left to right along top row
      for (let col = left; col <= right; col++) {
        positions.push([top, col]);
      }
      top++;
      
      // Move from top to bottom along rightmost column
      for (let row = top; row <= bottom; row++) {
        positions.push([row, right]);
      }
      right--;
      
      // Move from right to left along bottom row (if there is a bottom row)
      if (top <= bottom) {
        for (let col = right; col >= left; col--) {
          positions.push([bottom, col]);
        }
        bottom--;
      }
      
      // Move from bottom to top along leftmost column (if there is a left column)
      if (left <= right) {
        for (let row = bottom; row >= top; row--) {
          positions.push([row, left]);
        }
        left++;
      }
    }
  } else { // Counter-clockwise
    while (top <= bottom && left <= right) {
      // Move from top to bottom along leftmost column
      for (let row = top; row <= bottom; row++) {
        positions.push([row, left]);
      }
      left++;
      
      // Move from left to right along bottom row
      for (let col = left; col <= right; col++) {
        positions.push([bottom, col]);
      }
      bottom--;
      
      // Move from bottom to top along rightmost column (if there is a right column)
      if (left <= right) {
        for (let row = bottom; row >= top; row--) {
          positions.push([row, right]);
        }
        right--;
      }
      
      // Move from right to left along top row (if there is a top row)
      if (top <= bottom) {
        for (let col = right; col >= left; col--) {
          positions.push([top, col]);
        }
        top++;
      }
    }
  }
  
  return positions;
}

// Helper function to read the grid in a snake route (alternating left-to-right, right-to-left)
function readSnakeRoute(grid, rows, cols) {
  const positions = getSnakePositions(rows, cols);
  
  let result = '';
  for (const [row, col] of positions) {
    result += grid[row][col];
  }
  
  return result;
}

// Helper function to get positions in snake order
function getSnakePositions(rows, cols) {
  const positions = [];
  
  for (let row = 0; row < rows; row++) {
    if (row % 2 === 0) {
      // Even rows: left to right
      for (let col = 0; col < cols; col++) {
        positions.push([row, col]);
      }
    } else {
      // Odd rows: right to left
      for (let col = cols - 1; col >= 0; col--) {
        positions.push([row, col]);
      }
    }
  }
  
  return positions;
}

// Helper function to read the grid in a diagonal route
function readDiagonalRoute(grid, rows, cols) {
  const positions = getDiagonalPositions(rows, cols);
  
  let result = '';
  for (const [row, col] of positions) {
    result += grid[row][col];
  }
  
  return result;
}

// Helper function to get positions in diagonal order
function getDiagonalPositions(rows, cols) {
  const positions = [];
  
  // For each diagonal
  for (let sum = 0; sum <= rows + cols - 2; sum++) {
    for (let row = 0; row <= sum; row++) {
      const col = sum - row;
      
      if (row < rows && col < cols) {
        positions.push([row, col]);
      }
    }
  }
  
  return positions;
}

module.exports = { routeEncrypt, routeDecrypt };