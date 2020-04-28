import { connect } from 'mongodb';

connect(`mongodb://localhost:27017`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (!err) {
    let dbName = client.db('matcha');
    console.log('Successfully connected to database!\n');
  } else {
    console.log('Could not connect to the database. \nCheck that the MongoDB service is running and make sure that you are running the service on port 27017. \nRun `tsc setup.ts` and then `node setup.js` to see what the error is.');
  }
  console.log('The script is finished. Press ctrl + c to exit.');
})
