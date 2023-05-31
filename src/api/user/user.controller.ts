import {
  interfaces,
  controller,
  httpGet,
  response,
  requestBody,
  httpPost
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { USER_SERVICE, UserService } from './user.service';
import { Response } from 'express';
import { User, UserAttribute } from './user.model';
import httpStatusCode from 'http-status-codes';
import Joi from 'joi';
import { validatorData } from '../../utils/validator';

@controller('/api/user')
export class UserController implements interfaces.Controller {
  public constructor(@inject(USER_SERVICE) private readonly userService: UserService) {}

  @httpGet('/all')
  public async getUsers(@response() res: Response): Promise<readonly User[] | Response> {
    try {
      return await this.userService.getUsers();
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${error}` });
    }
  }

  @httpPost('/create',
    validatorData({username: Joi.string().required(), email: Joi.string().required(), password: Joi.string().required()})
  )
  public async createUser(
    @requestBody() user: UserAttribute,
    @response() res: Response,
  ): Promise<User | Response> {
    try {
      return await this.userService.createUser(user as User);
    } catch (error) {
      console.log(error);
      return res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Something went wrong with creating user ${error}` });
    }
  }
}