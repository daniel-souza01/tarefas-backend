import { User } from '@/domain/account/entities/user'
import { UserPassword } from '@/domain/account/entities/user-password'
import { User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(user: PrismaUser): User {
    return new User(
      {
        name: user.name,
        email: user.email,
        password: new UserPassword(user.password),
        createdAt: user.createdAt,
      },
      user.id,
    )
  }

  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password.value,
      createdAt: user.createdAt,
    }
  }
}
