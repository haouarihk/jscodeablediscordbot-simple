const Db = require("./db.js");
const express = require("express");
const filter = require("./filter.js");
const app = express();
app.use(express.static("public"));
app.get("/", (request, response) => {
  response.status(200).sendFile(__dirname + "/index.html");
  console.log("breath");
});
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

//Go and google uptime robot/cula.io

const userCommands = new Db("./userCommands.jsonnn");
require("dotenv").config();
const folder = "./clientsfunctions/";
const fs = require("fs");
const Discord = require("discord.js");
const js = require("./js.js");
let client = new Discord.Client();
let programmedfile;
const simon = ["say BeatmyBot", "say boblebehlio"];

/*const alpha = setInterval(async () => {
  console.log("trying to connect....");
  await client.login(process.env.BOT_TOKEN).catch((e)=>console.error(e));
  console.log('Login promise ended')
}, 3000);*/
client.on("debug", (e) => console.info(e));
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //clearInterval(alpha);
});
let dadid = "";
let userid = "";
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.author.id == userid) {
    msg.delete();
    msg.channel.send(msg.content);
  }
  if (msg.content.startsWith("%help")) {
    msg.reply(`you can use those commands
        -for help %help
        -for simon says %simonSays
        -for take me %takeMe
        -for stop taking me %stopTakingMe
        -for im Your Dad %imYourDad
        -for code: code ${"```js"}
        -for runing the code wolfrun
    `);
  }
  if (msg.content === "%simonSays") {
    msg.reply(simon[Math.floor(Math.random() * (simon.length - 1) + 0)]);
  }
  if (msg.content.startsWith("%pat")) {
    msg.reply(`Thanks ${msg.member.id === dadid ? "daddy" : ""}`);
  }
  if (msg.content === "%takeMe") {
    userid = msg.author.id;
    msg.delete();
  }
  if (msg.content === "%imYourDad") {
    dadid = msg.author.id;
    msg.channel.send('ok "dad"');
  }
  if (msg.content === "%stopTakingMe") {
    msg.delete();
    userid = "";
  }

  if (msg.content.startsWith("code ```js")) {
    try {
      userCommands.value[msg.author.id] = `programmed=(message)=>{
          ${filter.getCode(msg.content)}}`;
      msg.channel.send("bib bob got programmed");
    } catch (err) {
      msg.channel.send("error " + err);
    }
  }
  if (msg.content.startsWith("wolfrun")) {
    try {
      let programmed = () => "You don't have any code to run.";
      eval(userCommands.value[msg.author.id] || "");
      let genNewProxy = data =>
        new Proxy(data, {
          get: (obj, prop) => {
            if (typeof obj[prop] == "function") {
              return a=>msg.username.setNickname(Array.from(arguments).map(JSON.stringify).join(', '));
            } else if (
              typeof obj[prop] == "object" ||
              typeof obj[prop] == "array"
            ) {
              return genNewProxy(obj[prop]);
            } else {
              return obj[prop];
            }
          }
        });
      let proxiedMsg = genNewProxy(msg);
      let o = programmed(proxiedMsg);
      msg.channel.send(
        o != null
          ? o.length !== 0
            ? filter.filter(o)
            : "Attention! An empty string showed up!\nIt is very dangerous under its wild form.\nDo not approach it!"
          : "nothing showed up..."
      );
    } catch (err) {
      msg.channel.send("error " + err);
    } //
  }
});

//Wait i think i have an idea
//We can use proxies
client.login(process.env.BOT_TOKEN)
//It will auto retry when it will be avail