import { beforeEach, describe, expect, test } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher

let sut: CreateUserUseCase

describe('Create user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()

    sut = new CreateUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  test('should be able to create a new user', async () => {
    const result = await sut.execute({
      name: 'user test',
      email: 'usertest@example.com',
      password: '12345678',
    })

    expect(result.user).toStrictEqual(inMemoryUsersRepository.users[0])
  })

  test('should hash user password', async () => {
    const password = '12345678'

    const result = await sut.execute({
      name: 'user test',
      email: 'usertest@example.com',
      password,
    })

    const hashedPassword = await fakeHasher.hash(password)

    expect(result.user.password.value).toStrictEqual(hashedPassword)
  })

  test('should not be able to create a new user with an existing email', async () => {
    const email = 'usertest@example.com'

    await sut.execute({
      name: 'user test',
      email,
      password: '12345678',
    })

    expect(() =>
      sut.execute({
        name: 'user test',
        email,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
