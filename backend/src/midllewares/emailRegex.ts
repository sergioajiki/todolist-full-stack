export default class Email {
  private static regex = /\S+@\S+\.\S+/;

  public static isValidEmail(email: string): boolean {
    return this.regex.test(email);
  }
}