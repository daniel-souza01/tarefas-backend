import { randomUUID } from 'node:crypto'
import { Replace } from '@/helpers/Replace'
import { UserPassword } from './user-password'

export interface UserProps {
  name: string
  email: string
  password: UserPassword
  createdAt: Date
}

export class User {
  private _id: string
  private props: UserProps

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id(): string {
    return this._id
  }

  public get name(): string {
    return this.props.name
  }

  public get email(): string {
    return this.props.email
  }

  public get password(): UserPassword {
    return this.props.password
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
