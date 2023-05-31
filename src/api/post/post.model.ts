import { User } from '../user/user.model';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

export const POST_REPOSITORY: symbol = Symbol.for('PostRepository');

export interface PostAttribute {
  id: number;
  title: string;
  content: string;
  userId: string;
}

@Table
export class Post extends Model<Post> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  public id!: number;

  @Column({
    type: DataType.STRING,
  })
  public title!: string;

  @Column({
    type: DataType.TEXT,
  })
  public content!: string;

  @ForeignKey(() => User)
  @Column
  public userId!: number;

  @BelongsTo(() => User)
  User: User;
}

export type PostRepository = typeof Post;
