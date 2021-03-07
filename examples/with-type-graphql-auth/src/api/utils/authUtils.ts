import bcrypt from 'bcryptjs';

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 12);

export const validatePassword = (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash);
