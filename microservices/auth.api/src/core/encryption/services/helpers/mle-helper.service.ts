import { Injectable } from '@nestjs/common';
import { ApiConstants } from '../../../constants/api.constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getRandomValues, subtle } = require('crypto').webcrypto;

@Injectable()
export class MleHelperService {
  async generateKeys() {
    return await subtle.generateKey(
      {
        name: 'ECDH',
        namedCurve: 'P-256'
      },
      true,
      ['deriveKey', 'deriveBits']
    );
  }

  async createDerivedKey(clientPublicKeyJwk, privateKey) {
    const publicKey = await subtle.importKey(
      'jwk',
      clientPublicKeyJwk,
      { name: 'ECDH', namedCurve: 'P-256' },
      true,
      []
    );

    const derivedKey = await subtle.deriveKey(
      { name: 'ECDH', public: publicKey },
      privateKey,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );

    // We export to jwk so it can be saved in the session
    return await subtle.exportKey('jwk', derivedKey);
  }

  parseMessageJson(messageJson) {
    const newJson = JSON.parse(messageJson);
    delete newJson.default;
    return newJson;
  }
}
