import { Router } from 'express'
import { CreateAccountController } from '../controllers/users/create-account-controller'

const usersRoutes = Router()

const createAccountController = new CreateAccountController()

usersRoutes.post('/', createAccountController.handle)

export { usersRoutes }
