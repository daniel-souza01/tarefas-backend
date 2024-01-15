import { describe, expect, test } from 'vitest'
import { User } from './user'

describe('User entity', () => {
  test('should be able to create a user', () => {
    const mockedUser = {
      name: 'user',
      email: 'user@example.com',
      password: '123456',
    }

    const user = new User(mockedUser)

    expect(user).contain(mockedUser)
    expect(user.id).toBeTruthy()
    expect(user.createdAt).toBeInstanceOf(Date)
  })
})
