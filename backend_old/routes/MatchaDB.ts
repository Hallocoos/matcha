import * as mysql from 'mysql';

var MatchaDB = mysql.createConnection({
  host: "localhost",
  user: "matcha",
  password: "matcha",
  database: "matcha"
});

export default MatchaDB;