import { User } from '../user/user.model';
import { AfterCreate, AfterFind, AfterUpdate, BeforeCreate, BeforeUpdate, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import CryptoJS from 'crypto-js';

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

  // encrypt the content before creating and updating the record
  @BeforeCreate
  @BeforeUpdate
  static encryptContent(instance: Post): void {
    if (instance.content) {
      instance.content = CryptoJS.AES.encrypt(instance.content, process.env.ENCRYPTION_KEY!).toString();
    }
  }

  // Decrypt the content after finding, creating and updating the record
  @AfterFind
  @AfterCreate
  @AfterUpdate
  static decryptContent(instances: Post | Post[]): void {
    if (Array.isArray(instances)) {
      instances.forEach((instance) => {
        Post.decryptContent(instance);
      });
    } else {
      if (instances.content) {
        instances.content = CryptoJS.AES.decrypt(instances.content, process.env.ENCRYPTION_KEY!).toString(CryptoJS.enc.Utf8);
      }
    }
  }
}

export type PostRepository = typeof Post;
