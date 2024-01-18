import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import { env } from '../env'
import { router } from './routes'
import { AppError } from '../errors/app-error'
import '../container'

const app = express()

app.use(express.json())

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }

    return response.status(500).json({
      message: `Internal server error - ${err.message}`,
    })
  },
)

app.listen(env.PORT, () =>
  console.log(`HTTP Server Running on port ${env.PORT}!`),
)
