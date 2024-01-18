import { Request, Response } from 'express'

import { CreateUserUseCase } from '@/domain/account/use-cases/create-user'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { UserPresenter } from '../../presenters/user-presenter'

export class CreateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const bcryptHasher = new BcryptHasher()
    const prismaUsersRepository = new PrismaUsersRepository()
    const createUserUseCase = new CreateUserUseCase(
      prismaUsersRepository,
      bcryptHasher,
    )

    const { user } = await createUserUseCase.execute({
      name,
      email,
      password,
    })

    return response.status(201).send({ user: UserPresenter.toHTTP(user) })
  }
}
