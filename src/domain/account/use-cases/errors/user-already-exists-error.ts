import { AppError } from '@/infra/errors/app-error'

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super('E-mail already exists.', 409)
  }
}
