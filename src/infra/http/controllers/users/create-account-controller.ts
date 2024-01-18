import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from '@/domain/account/use-cases/create-user'
import { UserPresenter } from '../../presenters/user-presenter'

export class CreateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const { user } = await createUserUseCase.execute({
      name,
      email,
      password,
    })

    return response.status(201).send({ user: UserPresenter.toHTTP(user) })
  }
}
