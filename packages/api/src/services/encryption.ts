import * as crypto from 'crypto';
import { env } from '@wyrecc/env';

const algorithm = 'aes-256-cbc';
const secret = env.ENCRYPTION_KEY;

const secretKey = crypto.createHash('sha256').update(String(secret)).digest('base64').substring(0, 32);
// process.env.ENCRYPTION_KEY;
const randomIv = Buffer.from(
  crypto.createHash('sha256').update(String(secret)).digest('base64').substring(0, 16)
);

export class EncryptionService {
  static encryptData(data: string) {
    const cipher = crypto.createCipheriv(algorithm, secretKey, randomIv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  static decryptData(data: string) {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, randomIv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
