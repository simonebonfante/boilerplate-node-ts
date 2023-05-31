import { ContainerModule, interfaces } from 'inversify';
import { POST_REPOSITORY, Post, PostRepository } from './post.model';
import { POST_SERVICE, PostService, PostServiceInterface } from './post.service';

export const postModule = (): ContainerModule => {
  return new ContainerModule(
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => {
      bind<PostRepository>(POST_REPOSITORY).toConstantValue(Post);
      /* Services */
      bind<PostServiceInterface>(POST_SERVICE).to(PostService).inSingletonScope();
    },
  );
};
