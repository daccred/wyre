import * as argon2 from 'argon2';

export const hashString = async (str: string) => {
  return await argon2.hash(str);
};

export const verifyHash = async (str: string, hash: string) => {
  return await argon2.verify(hash, str);
};
