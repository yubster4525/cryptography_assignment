/**
 * Examples of using the cryptographic algorithms
 */

const crypto = require('./index');

// Sample text for encryption
const sampleText = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG";

console.log("Original text:", sampleText);
console.log("-----------------------------------");

// 1. Caesar Cipher
const caesarEncrypted = crypto.caesarEncrypt(sampleText, 3);
console.log("Caesar Cipher (Shift 3):");
console.log("Encrypted:", caesarEncrypted);
console.log("Decrypted:", crypto.caesarDecrypt(caesarEncrypted, 3));
console.log("-----------------------------------");

// 2. Atbash Cipher
const atbashEncrypted = crypto.atbashEncrypt(sampleText);
console.log("Atbash Cipher:");
console.log("Encrypted:", atbashEncrypted);
console.log("Decrypted:", crypto.atbashDecrypt(atbashEncrypted));
console.log("-----------------------------------");

// 3. August (ADFGVX) Cipher
const augustEncrypted = crypto.augustEncrypt(sampleText, "SECRET");
console.log("August Cipher (Key: SECRET):");
console.log("Encrypted:", augustEncrypted);
console.log("Decrypted:", crypto.augustDecrypt(augustEncrypted, "SECRET"));
console.log("-----------------------------------");

// 4. Affine Cipher
const affineEncrypted = crypto.affineEncrypt(sampleText, 5, 8);
console.log("Affine Cipher (a=5, b=8):");
console.log("Encrypted:", affineEncrypted);
console.log("Decrypted:", crypto.affineDecrypt(affineEncrypted, 5, 8));
console.log("-----------------------------------");

// 5. Vigenere Cipher
const vigenereEncrypted = crypto.vigenereEncrypt(sampleText, "KEY");
console.log("Vigenere Cipher (Key: KEY):");
console.log("Encrypted:", vigenereEncrypted);
console.log("Decrypted:", crypto.vigenereDecrypt(vigenereEncrypted, "KEY"));
console.log("-----------------------------------");

// 6. Gronsfeld Cipher
const gronsfeldEncrypted = crypto.gronsfeldEncrypt(sampleText, "123");
console.log("Gronsfeld Cipher (Key: 123):");
console.log("Encrypted:", gronsfeldEncrypted);
console.log("Decrypted:", crypto.gronsfeldDecrypt(gronsfeldEncrypted, "123"));
console.log("-----------------------------------");

// 7. Beaufort Cipher
const beaufortEncrypted = crypto.beaufortEncrypt(sampleText, "CIPHER");
console.log("Beaufort Cipher (Key: CIPHER):");
console.log("Encrypted:", beaufortEncrypted);
console.log("Decrypted:", crypto.beaufortDecrypt(beaufortEncrypted, "CIPHER"));
console.log("-----------------------------------");

// 8. Autokey Cipher
const autokeyEncrypted = crypto.autokeyEncrypt(sampleText, "KEY");
console.log("Autokey Cipher (Primer: KEY):");
console.log("Encrypted:", autokeyEncrypted);
console.log("Decrypted:", crypto.autokeyDecrypt(autokeyEncrypted, "KEY"));
console.log("-----------------------------------");

// 9. N-gram Operations
console.log("N-gram Operations (n=2):");
const bigrams = crypto.generateNgrams(sampleText, 2);
console.log("Bigrams:", bigrams.slice(0, 5), "...");
const bigramFreq = crypto.ngramFrequency(sampleText, 2);
console.log("Bigram Frequencies (top 3):", crypto.sortByFrequency(bigramFreq).slice(0, 3));
console.log("Index of Coincidence:", crypto.calculateIC(sampleText));
console.log("-----------------------------------");

// 10. Hill Cipher (with a 2x2 matrix)
const hillKey = [
  [2, 3],
  [1, 4]
];
try {
  const hillEncrypted = crypto.hillEncrypt(sampleText, hillKey);
  console.log("Hill Cipher (2x2 matrix):");
  console.log("Encrypted:", hillEncrypted);
  console.log("Decrypted:", crypto.hillDecrypt(hillEncrypted, hillKey));
} catch (e) {
  console.log("Hill Cipher error:", e.message);
}
console.log("-----------------------------------");

// 11. Rail Fence Cipher
const railFenceEncrypted = crypto.railFenceEncrypt(sampleText, 3);
console.log("Rail Fence Cipher (3 rails):");
console.log("Encrypted:", railFenceEncrypted);
console.log("Decrypted:", crypto.railFenceDecrypt(railFenceEncrypted, 3));
console.log("-----------------------------------");

// 12. Route Cipher
const routeEncrypted = crypto.routeEncrypt(sampleText, 5, 8, 'spiral');
console.log("Route Cipher (5x8 grid, spiral route):");
console.log("Encrypted:", routeEncrypted);
console.log("Decrypted:", crypto.routeDecrypt(routeEncrypted, 5, 8, 'spiral'));
console.log("-----------------------------------");

// 13. Myszkowski Transposition Cipher
const myszkowskiEncrypted = crypto.myszkowskiEncrypt(sampleText, "KEYWORD");
console.log("Myszkowski Cipher (Key: KEYWORD):");
console.log("Encrypted:", myszkowskiEncrypted);
console.log("Decrypted:", crypto.myszkowskiDecrypt(myszkowskiEncrypted, "KEYWORD"));
console.log("-----------------------------------");