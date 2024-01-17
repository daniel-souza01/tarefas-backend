import { User } from '@/domain/account/entities/user'
import { UsersRepository } from '@/domain/account/repositories/users-repository'
import { prisma } from '@/infra/database/prisma'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await prisma.user.create({
      data,
    })
  }
}
