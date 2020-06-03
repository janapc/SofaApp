require('dotenv').config();
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import User from '../entity/User';
import { verifyToken } from '../utils/verifyToken';

/**
 * @class SessionController
 * @description All of the methods of the session.
 */
class SessionController {
  /**
   * @function store
   * @async
   * @description This function create the session of the user
   * @param req {Object} The request.
   * @param res {Object} The response.
   * @param req.params.id {String} id of user.
   * @returns {JSON} token of user
   */
  public async store(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'id is required' });

    const repository = await getRepository(User);
    let userUpdate = await await repository.findOne({
      where: { id },
    });

    if (!userUpdate)
      return res.status(400).json({ error: 'User is not found' });

    let expired = verifyToken(userUpdate.token);
    if (expired) {
      const token = jwt.sign({ data: id }, process.env.SECRET, {
        expiresIn: '7d',
      });
      userUpdate.token = token;
      let result = await repository.save(userUpdate);
      let userToken = { token: result.token };
      return res.json(userToken);
    } else {
      return res.json({ token: userUpdate.token });
    }
  }
}
export default new SessionController();
