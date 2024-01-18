import { container } from 'tsyringe'

import { UsersRepository } from '@/domain/account/repositories/users-repository'
import { HashGenerator } from '@/domain/account/cryptography/hash-generator'
import { HashComparer } from '@/domain/account/cryptography/hash-comparer'

import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users-repository'
import { BcryptHasher } from '../cryptography/bcrypt-hasher'

container.registerSingleton<UsersRepository>(
  'UsersRepository',
  PrismaUsersRepository,
)

container.registerSingleton<HashGenerator>('HashGenerator', BcryptHasher)

container.registerSingleton<HashComparer>('HashComparer', BcryptHasher)
