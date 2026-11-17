const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
const dotenv = require("dotenv").config();

const uri = process.env.db_uri;

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

let myCollection;

app.post("/addScore", async (req, res) => {
  const { user, time } = req.body;

  await myCollection.insertOne({ user, time });

  return res.status(200).json({ success: true });
});

app.get("/getScores", async(req,res)=>{
  let findResult = myCollection.find({});
  let scores = [];

  for await(const doc of findResult){
    scores.push(doc);
  }

  return res.status(200).json({scores: scores});
});

async function startServer() {
  await client.connect();
  
  const myDB = client.db("ET0744");
  myCollection = myDB.collection("Scores");
  app.listen(8000, "127.0.0.1");
}

startServer();