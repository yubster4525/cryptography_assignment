/**
 * Rail Fence Cipher implementation
 * A transposition cipher where the plaintext is written in a zig-zag pattern
 * across a number of "rails" and then read off row by row.
 */

function railFenceEncrypt(plaintext, rails) {
  if (rails < 2) {
    throw new Error("Number of rails must be at least 2");
  }
  
  // Create the rail fence pattern
  const fence = Array(rails).fill('').map(() => Array(plaintext.length).fill(''));
  
  let row = 0;
  let direction = 1; // 1 for down, -1 for up
  
  // Fill the fence with the plaintext
  for (let col = 0; col < plaintext.length; col++) {
    fence[row][col] = plaintext[col];
    
    // Change direction when we hit the top or bottom rail
    if (row === 0) {
      direction = 1;
    } else if (row === rails - 1) {
      direction = -1;
    }
    
    row += direction;
  }
  
  // Read off the fence row by row
  let result = '';
  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < plaintext.length; j++) {
      if (fence[i][j] !== '') {
        result += fence[i][j];
      }
    }
  }
  
  return result;
}

function railFenceDecrypt(ciphertext, rails) {
  if (rails < 2) {
    throw new Error("Number of rails must be at least 2");
  }
  
  // Create the rail fence pattern matrix
  const fence = Array(rails).fill('').map(() => Array(ciphertext.length).fill(''));
  
  // Mark positions in the fence where letters will be
  let row = 0;
  let direction = 1;
  
  for (let col = 0; col < ciphertext.length; col++) {
    fence[row][col] = '*'; // Mark this position
    
    // Change direction when we hit the top or bottom rail
    if (row === 0) {
      direction = 1;
    } else if (row === rails - 1) {
      direction = -1;
    }
    
    row += direction;
  }
  
  // Fill the fence with the ciphertext
  let index = 0;
  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < ciphertext.length; j++) {
      if (fence[i][j] === '*' && index < ciphertext.length) {
        fence[i][j] = ciphertext[index++];
      }
    }
  }
  
  // Read off the fence in zigzag order
  let result = '';
  row = 0;
  direction = 1;
  
  for (let col = 0; col < ciphertext.length; col++) {
    result += fence[row][col];
    
    // Change direction when we hit the top or bottom rail
    if (row === 0) {
      direction = 1;
    } else if (row === rails - 1) {
      direction = -1;
    }
    
    row += direction;
  }
  
  return result;
}

module.exports = { railFenceEncrypt, railFenceDecrypt };