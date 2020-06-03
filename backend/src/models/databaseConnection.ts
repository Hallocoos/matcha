import mysql from 'mysql';

var matchaDB = mysql.createConnection({
  host: "localhost",
  user: "matcha",
  password: "matcha"
});

export default matchaDB;