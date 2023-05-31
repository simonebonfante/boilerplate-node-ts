import { Column, DataType, Model, Table, BeforeCreate, BeforeUpdate, HasMany } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import { Post } from '../post/post.model';

export const USER_REPOSITORY: symbol = Symbol.for('UserRepository');

export interface UserAttribute {
  id: number,
  username: string,
  email: string,
  password: string
}

@Table
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  public id!: number;

  @Column({
    type: DataType.STRING,
    unique: true
  })
  public username!: string;

  @Column({
    type: DataType.STRING,
    unique: true
  })
  public email!: string;

  @Column({
    type: DataType.STRING,
  })
  public password!: string;

  @HasMany(() => Post)
  posts: Post[];

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      const saltRounds = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(instance.password, saltRounds);
      instance.password = hashedPassword;
    }
  }
}

export type UserRepository = typeof User;
