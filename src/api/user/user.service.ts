import { injectable, inject } from 'inversify';
import { UserRepository, USER_REPOSITORY, User, UserAttribute } from './user.model';
import { Post } from '../post/post.model';

export const USER_SERVICE: symbol = Symbol.for('UserService');

export interface UserServiceInterface {
  getUsers(): Promise<ReadonlyArray<User>>;
  createUser(user: UserAttribute): Promise<User>;
}

@injectable()
export class UserService implements UserServiceInterface {
  public constructor(@inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  public getUsers(): Promise<readonly User[]> {
    return Promise.resolve(this.userRepository.findAll({ attributes: ['id', 'username'], include: [Post] }));
  }

  public createUser(user: User): Promise<User> {
    return Promise.resolve(this.userRepository.create(user));
  }

}
