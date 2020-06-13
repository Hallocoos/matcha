// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host: 'localhost',
//     user: 'matcha',
//     password: 'matcha',s
//     database: 'matcha'
//   }
// });

// knex.client((err, connection) => {
//   if (err)
//     throw (err);
//   else
//     console.log(connection);
// })

// export default knex;

const dotenv = require('dotenv').config()

var config = {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'matcha',
      password: 'matcha',
      database: 'matcha'
    }
}

module.exports = require('knex')(config)