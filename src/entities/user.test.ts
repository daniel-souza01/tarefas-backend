import { describe, expect, test } from 'vitest'
import { User } from './user'
import { UserPassword } from './user-password'

describe('User entity', () => {
  test('should be able to create a user', () => {
    const mockedUser = {
      name: 'user',
      email: 'user@example.com',
      password: new UserPassword('12345678'),
    }

    const user = new User(mockedUser)

    expect(user).contain(mockedUser)
    expect(user.id).toBeTruthy()
    expect(user.createdAt).toBeInstanceOf(Date)
  })
})
