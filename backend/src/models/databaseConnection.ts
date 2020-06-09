import mysql from 'mysql';

var DBConfig = {
  port: 3306,
  host: 'localhost',
  user: 'matcha',
  password: 'matcha',
  // port: '/var/run/mysqld/mysqld.sock',
};

var matchaDB = mysql.createConnection(DBConfig);

matchaDB.connect(function(err){
  if (!err)
  {
    console.log('Connected to MySQL Database!');
    matchaDB.query("CREATE DATABASE IF NOT EXISTS matcha;", (err, data) => {
      if (err)
        console.log(err);
      else
        console.log(data);
    });
  } else
    console.log(err);
});

// matchaDB.end();

export default matchaDB;