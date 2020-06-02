import MatchaDB from '../routes/models/MatchaDB';

MatchaDB.connect(function(err) {
  if (err)
    throw err;
  else
    console.log("Connected!");
});