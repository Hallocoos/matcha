import { Request, Response } from 'express'

export enum Roles {
  Admin = 'admin',
  User = 'user'
}

export function verifyToken (roles: Roles) {
  return function (request: Request, response: Response, next): void {
    const bearerHeader = request.headers['authorization'];
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      request['token'] = bearerToken;
      next();
    } else {
      response.sendStatus(403);
    }
  }
}
