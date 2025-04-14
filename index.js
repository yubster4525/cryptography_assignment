/**
 * Crypto Algorithms Collection
 * A collection of classical cryptographic algorithms implemented in JavaScript
 */

const caesar = require('./caesar');
const atbash = require('./atbash');
const august = require('./august');
const affine = require('./affine');
const vigenere = require('./vigenere');
const gronsfeld = require('./gronsfeld');
const beaufort = require('./beaufort');
const autokey = require('./autokey');
const ngram = require('./ngram');
const hill = require('./hill');
const railFence = require('./rail_fence');
const route = require('./route');
const myszkowski = require('./myszkowski');

module.exports = {
  // Caesar Cipher
  caesarEncrypt: caesar.caesarEncrypt,
  caesarDecrypt: caesar.caesarDecrypt,
  
  // Atbash Cipher
  atbashEncrypt: atbash.atbashEncrypt,
  atbashDecrypt: atbash.atbashDecrypt,
  
  // August Cipher (ADFGVX)
  augustEncrypt: august.augustEncrypt,
  augustDecrypt: august.augustDecrypt,
  
  // Affine Cipher
  affineEncrypt: affine.affineEncrypt,
  affineDecrypt: affine.affineDecrypt,
  
  // Vigenere Cipher
  vigenereEncrypt: vigenere.vigenereEncrypt,
  vigenereDecrypt: vigenere.vigenereDecrypt,
  
  // Gronsfeld Cipher
  gronsfeldEncrypt: gronsfeld.gronsfeldEncrypt,
  gronsfeldDecrypt: gronsfeld.gronsfeldDecrypt,
  
  // Beaufort Cipher
  beaufortEncrypt: beaufort.beaufortEncrypt,
  beaufortDecrypt: beaufort.beaufortDecrypt,
  
  // Autokey Cipher
  autokeyEncrypt: autokey.autokeyEncrypt,
  autokeyDecrypt: autokey.autokeyDecrypt,
  
  // N-gram Operations
  generateNgrams: ngram.generateNgrams,
  ngramFrequency: ngram.ngramFrequency,
  sortByFrequency: ngram.sortByFrequency,
  calculateIC: ngram.calculateIC,
  findRepeatedNgrams: ngram.findRepeatedNgrams,
  
  // Hill Cipher
  hillEncrypt: hill.hillEncrypt,
  hillDecrypt: hill.hillDecrypt,
  
  // Rail Fence Cipher
  railFenceEncrypt: railFence.railFenceEncrypt,
  railFenceDecrypt: railFence.railFenceDecrypt,
  
  // Route Cipher
  routeEncrypt: route.routeEncrypt,
  routeDecrypt: route.routeDecrypt,
  
  // Myszkowski Transposition Cipher
  myszkowskiEncrypt: myszkowski.myszkowskiEncrypt,
  myszkowskiDecrypt: myszkowski.myszkowskiDecrypt
};