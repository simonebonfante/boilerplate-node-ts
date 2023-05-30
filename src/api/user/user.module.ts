import { ContainerModule, interfaces } from 'inversify';
import { USER_REPOSITORY, UserRepository, User } from './user.model';
import { UserServiceInterface, USER_SERVICE, UserService } from './user.service';

export const userModule = (): ContainerModule => {
  return new ContainerModule(
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => {
      bind<UserRepository>(USER_REPOSITORY).toConstantValue(User);
      /* Services */
      bind<UserServiceInterface>(USER_SERVICE).to(UserService).inSingletonScope();
    },
  );
};
