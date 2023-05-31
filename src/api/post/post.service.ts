import { injectable, inject } from 'inversify';
import { PostRepository, POST_REPOSITORY, Post } from './post.model';

export const POST_SERVICE: symbol = Symbol.for('PostService');

export interface PostServiceInterface {
  getPosts(): Promise<ReadonlyArray<Post>>;
  getPost(postId: number): Promise<Post | null>;
  createPost(post: Post): Promise<Post | null>;
}

@injectable()
export class PostService implements PostServiceInterface {
  public constructor(@inject(POST_REPOSITORY) private readonly postRepository: PostRepository) {}

  public async getPosts(): Promise<readonly Post[]> {
    const posts: Post[] = await this.postRepository.findAll();
    for (const post of posts) {
      post.content = post.decryptContent;
    }
    return posts;
  }

  public async getPost(postId: number): Promise<Post | null> {
    const post: Post | null = await this.postRepository.findByPk(postId);
    if (post) {
      post.content = post.decryptContent;
      return post;
    }
    return null;
    
  }

  public async createPost(post: Post): Promise<Post | null> {
    const postCreated: Post = await this.postRepository.create(post);
    return this.getPost(postCreated.id);
  }
}