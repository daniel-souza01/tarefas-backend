import { User } from '@/domain/account/entities/user'
import { UserPassword } from '@/domain/account/entities/user-password'
import { UsersRepository } from '@/domain/account/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { HashGenerator } from '@/domain/account/cryptography/hash-generator'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await this.hashGenerator.hash(password)

    const user = new User({
      name,
      email,
      password: new UserPassword(passwordHash),
    })

    await this.usersRepository.create(user)

    return {
      user,
    }
  }
}
