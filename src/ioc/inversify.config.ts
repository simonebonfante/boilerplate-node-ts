/* Load Controllers */
import { postModule } from '../api/post/post.module';
import '../api';

import { userModule } from '../api/user/user.module';
import { Container } from 'inversify';

export default (): Container => {
  const container = new Container();
  /* Load Modules */
  container.load(userModule(), postModule());
  return container;
};
