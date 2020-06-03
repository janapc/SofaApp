require('dotenv').config();
import * as jwt from 'jsonwebtoken';

export function verifyToken(token: string): any {
  return jwt.verify(token, process.env.SECRET, function (err: {
    message: string;
  }) {
    if (err) return { error: err.message };
  });
}
