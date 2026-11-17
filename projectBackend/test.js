const express = require("express");

const app = express();

app.get("getScores", async(req,res)=>{
  res.status = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end("<h1>Hi</h1>");
});

app.listen(8000, "127.0.0.1");