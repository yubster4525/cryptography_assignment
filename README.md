# Classical Cryptography Algorithms

A collection of 13 classical cryptographic algorithms implemented in JavaScript. This project provides implementations of various substitution and transposition ciphers for educational purposes.

## Student Information
- **Name:** Yuvan Raj Krishna
- **Register Number:** 22011102127

## Algorithms Implemented

1. **Caesar Cipher** - A simple substitution cipher where each letter is shifted by a fixed amount.
2. **Atbash Cipher** - A substitution cipher where each letter is replaced by its mirror in the alphabet.
3. **August (ADFGVX) Cipher** - A fractionated substitution cipher using a Polybius square and columnar transposition.
4. **Affine Cipher** - A substitution cipher that uses a mathematical function to encrypt letters.
5. **Vigenere Cipher** - A polyalphabetic substitution cipher using a keyword to determine shifts.
6. **Gronsfeld Cipher** - A variant of the Vigenere cipher using numbers instead of letters for the key.
7. **Beaufort Cipher** - A reciprocal cipher similar to Vigenere but with a different encryption formula.
8. **Autokey (Running Key) Cipher** - A polyalphabetic cipher where the key is derived from the plaintext.
9. **N-gram Operations** - Utilities for analyzing text using n-grams (useful for cryptanalysis).
10. **Hill Cipher** - A polygraphic cipher based on linear algebra, using matrices for encryption/decryption.
11. **Rail Fence Cipher** - A transposition cipher where text is written in a zigzag pattern.
12. **Route Cipher** - A transposition cipher that arranges text in a grid and reads it off following a specific route.
13. **Myszkowski Transposition Cipher** - A columnar transposition cipher variant.

## Usage

Each algorithm is implemented with separate encrypt and decrypt functions:

```javascript
const crypto = require('./index');

// Caesar Cipher example
const encrypted = crypto.caesarEncrypt("HELLO", 3);
console.log(encrypted); // "KHOOR"
const decrypted = crypto.caesarDecrypt(encrypted, 3);
console.log(decrypted); // "HELLO"
```

Check out `examples.js` for examples of using all the implemented ciphers.

## Running Examples

To run the examples:

```bash
npm run examples
```

## Project Structure

- `index.js` - Main module that exports all cipher functions
- `examples.js` - Example usage of all ciphers
- Individual JS files for each cipher implementation

## Educational Purpose

These implementations are primarily for educational purposes, to understand how classical ciphers work. They are not intended for securing sensitive information.
