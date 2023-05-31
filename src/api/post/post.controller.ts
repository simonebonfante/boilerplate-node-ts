import { inject } from 'inversify';
import {
  interfaces,
  controller,
  httpGet,
  response,
  requestBody,
  httpPost
} from 'inversify-express-utils';
import { POST_SERVICE, PostService } from './post.service';
import { Response } from 'express';
import httpStatusCode from 'http-status-codes';
import { Post } from './post.model';
import Joi from 'joi';
import { validatorData } from '../../utils/validator';

@controller('/api/post')
export class PostController implements interfaces.Controller {
  public constructor(@inject(POST_SERVICE) private readonly postService: PostService) {}

  @httpGet('/all')
  public async getPosts(@response() res: Response): Promise<readonly Post[] | Response> {
    try {
      return await this.postService.getPosts();
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${error}` });
    }
  }

  @httpPost('/create',
    validatorData({title: Joi.string().required(), content: Joi.string().required(), userId: Joi.number().required()})
  )
  public async createPost(
    @requestBody() post: Post,
    @response() res: Response,
  ): Promise<Post | Response> {
    try {
      return await this.postService.createPost(post as Post);
    } catch(error) {
      console.log(error);
      return res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Something went wrong with creating user ${error}` });
    }
  }
}