import bcrypt from 'bcrypt'

export default class BcryptUtils {
  hashPassword = (password: string): string => bcrypt.hashSync(password, 10);

  checkPassword = (password: string, hassPassword: string): boolean =>
    bcrypt.compareSync(password, hassPassword);
}