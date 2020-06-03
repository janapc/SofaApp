import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import User from '../entity/User';
import { verifyToken } from '../utils/verifyToken';

/**
 * @class UserController
 * @description All of the methods of the user.
 */
class UserController {
  /**
   * @function show
   * @public
   * @async
   * @param req {Object} The request.
   * @param res {Object} The response.
   * @param req.headers.token {String} token of user.
   * @description list the information of a user.
   * @returns {JSON} information of user.
   */
  public async show(req: Request, res: Response) {
    let { token } = req.headers;

    const repository = getRepository(User);
    const response = await repository.findOne({
      where: { token },
      select: ['id', 'email', 'favorite', 'token'],
    });

    if (!response) return res.status(400).json({ error: 'User is not found!' });
    let expired = verifyToken(response.token);

    if (expired) {
      const token = jwt.sign({ data: response.id }, process.env.SECRET, {
        expiresIn: '7d',
      });
      response.token = token;
      let result = await repository.save(response);
      return res.json({ token: result.token });
    } else {
      return res.json({ token: response.token });
    }
  }

  /**
   * @function store
   * @public
   * @async
   * @param req {Object} The request.
   * @param res {Object} The response.
   * @param req.body.email {String} email of user.
   * @param req.body.password {String} password of user.
   * @description This function create a new user.
   * @returns {JSON} information of user.
   */
  public async store(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;
    if (!email || !password)
      res.status(400).json({ error: 'These Field is required!' });

    const response = await repository.findOne({ where: { email } });
    if (response)
      return res.status(400).json({ error: 'This email already exists!' });

    const user = await repository.create({ email, password });
    const results = await repository.save(user);
    const userFormat = {
      id: results.id,
      email: results.email,
      favorite: results.favorite,
    };

    return res.json(userFormat);
  }
}
export default new UserController();
