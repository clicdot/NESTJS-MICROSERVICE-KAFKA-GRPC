import { Injectable } from '@nestjs/common';
import { MleHelperService } from './helpers/mle-helper.service';
import { ApiConstants } from '../../constants/api.constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getRandomValues, subtle } = require('crypto').webcrypto;

import { fromByteArray, toByteArray } from 'base64-js';

@Injectable()
export class MleService {
  constructor(private readonly __helper: MleHelperService) {}

  async generate(bodyKey) {
    // Generate key pair
    const { publicKey, privateKey } = await this.__helper.generateKeys();

    // Convert public key to JWK so it can be transferred
    // const publicKeyJwk = await subtle.exportKey('jwk', publicKey as CryptoKey);
    const publicKeyJwk = await subtle.exportKey('jwk', publicKey as CryptoKey);
    const privateKeyJwk = await subtle.exportKey(
      'jwk',
      privateKey as CryptoKey
    );

    // Create the derive key using the client's public key
    const derivedKey = await this.__helper.createDerivedKey(
      bodyKey,
      privateKey as CryptoKey
    );

    return {
      publicKeyJwk,
      privateKeyJwk,
      derivedKey
    };
  }

  async decrypt(encryptedMessage, jwkKey) {
    const [nonceBase64, cipherBase64] = encryptedMessage.split(':');

    const nonce = toByteArray(nonceBase64);
    const cipher = toByteArray(cipherBase64);

    // Anytime we have a jwk key we need to import it
    const derivedKey = await subtle.importKey(
      'jwk',
      jwkKey,
      { name: 'AES-GCM', length: 256 },
      true,
      ['decrypt']
    );

    const decryptedData = await subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: nonce
      },
      derivedKey,
      cipher
    );

    const messageJson = new TextDecoder().decode(decryptedData);
    const message = JSON.parse(messageJson);
    return typeof message === 'string'
      ? this.__helper.parseMessageJson(message)
      : message;
  }

  async encrypt(plainTextObject, jwkKey) {
    const json = JSON.stringify(plainTextObject);
    const encodedText = new TextEncoder().encode(json);
    const nonce = getRandomValues(new Uint8Array(16));
    // Anytime we have a jwk key we need to import it
    const derivedKey = await subtle.importKey(
      'jwk',
      jwkKey,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt']
    );
    const ciphertext = await subtle.encrypt(
      { name: 'AES-GCM', iv: nonce },
      derivedKey,
      encodedText
    );
    const cipherArray = new Uint8Array(ciphertext);
    return [fromByteArray(nonce), fromByteArray(cipherArray)].join(':');
  }
}
