import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../entity/User';

/**
 * @class FavoriteController
 * @description All of the methods of favorite.
 */
class FavoriteController {
  /**
   * @function index
   * @public
   * @async
   * @param req {Object} The request.
   * @param res {Object} The response.
   * @param req.headers.token {String} token of user.
   * @description list the favorites of a user.
   * @returns {JSON} list of favorites.
   */
  public async index(req: Request, res: Response) {
    let { token } = req.headers;

    const repository = getRepository(User);
    const response = await repository.findOne({
      where: { token },
      select: ['favorite'],
    });

    if (!response) return res.status(400).json({ error: 'User is not found!' });

    return res.json(response);
  }

  /**
   * @function store
   * @async
   * @param req {Object} The request.
   * @param res {Object} The response.
   * @param req.body {String} name of movie..
   * @param req.headers.token {String} token of user.
   * @description This function add a new movie a list.
   * @returns {JSON} information of user.
   */
  public async store(req: Request, res: Response) {
    const { token } = req.headers;
    const data = req.body;
    if (!data) res.status(400).json({ error: 'These Field is required!' });

    const repository = getRepository(User);

    const findUser = await repository.findOne({
      where: { token },
    });
    if (!findUser) return res.status(400).json({ error: 'User is not found!' });

    let findFavorite = findUser.favorite.find((fav) => fav.id === data.id);
    if (findFavorite)
      return res.status(400).json({ error: 'Movie Already favorite!' });

    findUser.favorite = [...findUser.favorite, data];
    let response = await repository.save(findUser);

    const userFormat = {
      id: response.id,
      email: response.email,
      favorite: response.favorite,
      token: response.token,
    };

    return res.json(userFormat);
  }

  /**
   * @function destroy
   * @async
   * @param req {Object} The request.
   * @param res {Object} The response.
   * @param req.params.id {String} id of movie.
   * @param req.headers.token {String} token of user.
   * @description This function removes a movie on the list.
   * @returns {JSON} information of user.
   */
  public async destroy(req: Request, res: Response) {
    const { token } = req.headers;
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'These Field is required!' });

    const repository = getRepository(User);

    const findUser = await repository.findOne({
      where: { token },
    });
    if (!findUser) return res.status(400).json({ error: 'User is not found!' });

    let findFavorite = findUser.favorite.find((fav) => fav.id == id);
    if (!findFavorite)
      return res.status(400).json({ error: 'The movie is not a favorite' });

    const indexMovie = findUser.favorite.indexOf(findFavorite);
    if (indexMovie > -1) findUser.favorite.splice(indexMovie, 1);
    let response = await repository.save(findUser);

    const userFormat = {
      id: response.id,
      email: response.email,
      favorite: response.favorite,
      token: response.token,
    };

    return res.json(userFormat);
  }
}
export default new FavoriteController();
