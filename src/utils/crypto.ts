import CryptoJS from "crypto-js";

const iv = CryptoJS.enc.Hex.parse(import.meta.env.VITE_CRYPTO_IV);
//Encoding the Salt in from UTF8 to byte array
const Salt = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTO_SALT);
//Encoding the Key in from UTF8 to byte array
const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTO_ISSUER);
//Creating the key in PBKDF2 format to be used during the decryption
const key128Bits1000Iterations = CryptoJS.PBKDF2(key.toString(CryptoJS.enc.Utf8), Salt, {
  keySize: 128 / 32,
  iterations: 1000
});

const mode = CryptoJS.mode.CBC;
const padding = CryptoJS.pad.Pkcs7;

export function encrypt(word: string) {
  //Encoding the Password in from UTF8 to byte array
  const Pass = CryptoJS.enc.Utf8.parse(word);

  //Decrypting the string contained in cipherParams using the PBKDF2 key
  var encrypt = CryptoJS.AES.encrypt(Pass, key128Bits1000Iterations, {
    mode,
    iv,
    padding
  });
  return encrypt.toString();
}

export function decrypt(encryptedStr: string) {
  var decrypt = CryptoJS.AES.decrypt(encryptedStr, key128Bits1000Iterations, {
    mode,
    iv,
    padding
  });

  return decrypt.toString(CryptoJS.enc.Utf8);
}
