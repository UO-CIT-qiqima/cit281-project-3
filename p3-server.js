/*
    CIT 281 Project 3
    Name: Qiqi Ma
*/
const {
    coinCount
} = require('./p3-module.js');

const fs = require("fs");

const fastify = require("fastify")();
  
  const http = require("http");
  const hostname = "localhost";
  const port = 8080;
 fastify.get("/", (request, reply) => {
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
       if (err) {
       console.log(err);
       reply.code(500);
       reply.header('Content-Type', 'text/html');
       reply.send("Error processing request");
      } else {
       reply.code(200);
       reply.header('Content-Type', 'text/html');
       reply.send(`${data}`);
  };
 });
 });

  fastify.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  });

  fastify.get("/coin", (request, reply) => {
    const {denom = 0, count = 0} = request.query;
    let coinValue = coinCount ({
       denom: parseInt(denom),
       count: parseInt(count),
    });
      reply 
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`)
    });
  
  fastify.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
  });

  fastify.get("/coins", (request, reply) => {
    const {option} = request.query;
    let coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
    switch(option){
      case "1" :
        coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });  
      break;
      case "2" :
        coinValue = coinCount(...coins);  
        break;
      case "3" :
        coinValue = coinCount(coins);
        break;
      default:
        coinValue = 0;  
    };
      reply 
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`)
    });
