export class UserPassword {
  private readonly password: string

  get value(): string {
    return this.password
  }

  private validatePasswordLength(password: string): boolean {
    return password.length >= 8
  }

  constructor(password: string) {
    const isPasswordLengthValid = this.validatePasswordLength(password)

    if (!isPasswordLengthValid) {
      throw new Error('Password must be at least 8 characters.')
    }

    this.password = password
  }
}
