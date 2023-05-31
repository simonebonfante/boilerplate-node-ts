import { User } from '../user/user.model';
import { BeforeCreate, BeforeUpdate, BelongsTo, Column, DataType, DefaultScope, ForeignKey, Model, Table } from 'sequelize-typescript';

export const POST_REPOSITORY: symbol = Symbol.for('PostRepository');

export interface PostAttribute {
  id: number;
  title: string;
  content: string;
  userId: string;
}

@DefaultScope(() => ({
  attributes: {
    exclude: ['content'],
  },
}))
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

  get decryptContent(): string {
    // decypt value
    return this.content.split(" Hello world")[0];
  }

  @Column(DataType.VIRTUAL)
  get fullName(): string {
    return this.getDataValue('content') + ' my encrypt';
  }

  @BeforeCreate
  @BeforeUpdate
  static async hashContent(instance: Post) {
    if (instance.changed('content')) {
      // crypt content
      instance.content = instance.content + ' Hello world'
    }
  }
}

export type PostRepository = typeof Post;
