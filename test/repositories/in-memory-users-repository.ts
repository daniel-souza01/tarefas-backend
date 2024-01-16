import { User } from '@/domain/account/entities/user'
import { UsersRepository } from '@/domain/account/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
