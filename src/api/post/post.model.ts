import { User } from '../user/user.model';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

export const POST_REPOSITORY: symbol = Symbol.for('PostRepository');

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
}

export type PostRepository = typeof Post;
