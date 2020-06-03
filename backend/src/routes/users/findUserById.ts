import express from 'express';
import { Request, Response } from 'express';
// import MatchaDB from '../models/MatchaDB';
const router = express.Router();

router.post('/findUserById', (request: Request, response: Response) => {
  // const query = "SELECT * FROM user WHERE id=" + request.body.id; + ";";
  // MatchaDB.connect((err) => {
  //   if (!err) {
  //     try {
  //       MatchaDB.query(query);
  //       console.log("HERE");
  //     } catch (e) {
  //       response.send(e);
  //     }
  //   } else {
  //     response.send(err);
  //   }
  // });
});

export default router;
