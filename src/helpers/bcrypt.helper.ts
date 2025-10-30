import bcrypt from 'bcryptjs';

export const SALT_ROUNDS = Number(process.env.BCRYPT_ROUNDS ?? 10);
const BCRYPT_RE = /^\$2[aby]\$\d{2}\$/;

export async function hashIfNeeded(plainOrHash: string): Promise<string> {
  if (!plainOrHash || BCRYPT_RE.test(plainOrHash)) return plainOrHash;
  return bcrypt.hash(plainOrHash, SALT_ROUNDS);
}

export async function comparePassword(
  plain: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
