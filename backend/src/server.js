const express = require('express');
const app = express();
const http = require('http').Server(app);

app.set('view engine', 'html');
app.set('views', 'views');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

function loggerMiddleware(request, response, next) {
  if (request.method !== 'HEAD') {
    const date = new Date().toISOString();
    console.info(`${date} - ${request.method} ${request.path}`);
  }
  next();
}

// const route = require('./routes/{route}');
const findUserById = require('./routes/users/findUserById');
// const verifyLogin = require('./routes/users/findUserByUsernameAndPassword');
// const upsertUser = require('./routes/users/upsertUser');
// const verifyUserById = require('./routes/users/verifyUserById');
// const setUserPasswordById = require('./routes/users/setUserPasswordById');
// const upsertImage = require('./routes/images/upsertImage');

app.use('/', findUserById);

app.listen(3000, () => {
  console.info('Server now listening on', 3000);
});