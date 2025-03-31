import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export const createHash = async (password: string, salt?: string) => {
  if (!salt) {
    salt = randomBytes(8).toString('hex');
  }
  const hash = (await scrypt(password, salt, 32)) as Buffer;

  return { salt, hash };
};
