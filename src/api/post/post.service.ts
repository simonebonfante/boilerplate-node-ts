import { injectable, inject } from 'inversify';
import { PostRepository, POST_REPOSITORY, Post } from './post.model';

export const POST_SERVICE: symbol = Symbol.for('PostService');

export interface PostServiceInterface {
  getPosts(): Promise<ReadonlyArray<Post>>;
  createPost(post: Post): Promise<Post>;
}

@injectable()
export class PostService implements PostServiceInterface {
  public constructor(@inject(POST_REPOSITORY) private readonly postRepository: PostRepository) {}

  public getPosts(): Promise<readonly Post[]> {
    return Promise.resolve(this.postRepository.findAll());
  }

  public createPost(post: Post): Promise<Post> {
    return Promise.resolve(this.postRepository.create(post));
  }

}