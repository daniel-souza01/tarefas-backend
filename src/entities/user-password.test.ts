import { describe, expect, test } from 'vitest'
import { UserPassword } from './user-password'

describe('User password entity', () => {
  test('should be able to create a password', () => {
    const password = new UserPassword('12345678')

    expect(password.value).toBe('12345678')
  })

  test('should not be able to create a password with less than 8 characters', () => {
    expect(() => new UserPassword('1234567')).toThrow()
  })
})
