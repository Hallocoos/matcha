import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { Request, Response } from 'express';
import { verifyToken, Roles } from './services/jwt';

const app = express();
dotenv.config();
module.exports = app;

app.set('view engine', 'html');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

function loggerMiddleware(request: Request, response: Response, next): void {
  if (request.method !== 'HEAD') {
    const date = new Date().toISOString();
    console.info(`${date} - ${request.method} ${request.path}`);
  }
  next();
};
app.use(loggerMiddleware);

import auth from './controllers/auth';
import admin from './controllers/admin';

app.use('/', auth);
app.use('/', verifyToken(Roles.User), admin);

app.all('*', (req, res) => {
  res.sendStatus(404)
});

const start = async () => {
  const port = process.env.PORT || 3000
  try {
    app.listen(port, () => {
      console.log('Server running on port %d', port)
    })
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

if (!module.parent) {
  start().catch(err => {
    console.log(err);
    process.exit(1);
  })
}
