import { NextFunction, Response } from 'express';
import { Request } from 'express-validator/src/base';
import Joi from 'joi';
/**
 * Merge req.body and req.query into req.data and validate it with joi
 * @export
 * @param {*} schema
 * @returns
 */
export function validatorData(schema: object) {
  return (req: Request, res: Response, next: NextFunction) => {
    const joiSchema = Joi.object().keys(schema);

    req.data = Object.assign(req.body, req.query);
    const results = joiSchema.validate(req.data);

    if (results.error) {
      console.error(results.error);
      res.status(401).send('Invalid input parameters!');
    } else {
      next();
    }
  };
}