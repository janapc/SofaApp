require('dotenv').config();
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { verifyToken } from '../utils/verifyToken';
import User from '../entity/User';
/**
 * @class LoginController
 * @description All of the methods of login.
 */
class LoginController {
  /**
   * @function store
   * @async
   * @param req {Object} The request.
   * @param res {Object} The response.
   * @param req.body.email {String} email of user.
   * @param req.body.password {String} password of user.
   * @description This function make the login of user.
   * @returns {JSON} information of user.
   */
  public async store(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'These Field is required!' });

    const response = await repository.findOne({ where: { email } });
    if (!response) return res.status(400).json({ error: 'User not exists!' });

    const result = bcrypt.compareSync(password, response.password);
    if (!result) return res.status(400).json({ error: 'Password incorrect' });

    let expired = verifyToken(response.token);
    if (expired) {
      const token = jwt.sign({ data: response.id }, process.env.SECRET, {
        expiresIn: '7d',
      });
      response.token = token;

      let result = await repository.save(response);
      const userFormat = {
        id: result.id,
        email: result.email,
        favorite: result.favorite,
        token: result.token,
      };
      return res.json(userFormat);
    } else {
      const userFormat = {
        id: response.id,
        email: response.email,
        favorite: response.favorite,
        token: response.token,
      };

      return res.json(userFormat);
    }
  }
}
export default new LoginController();
