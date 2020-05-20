
const express = require("express");
const app = express();


app.use(express.static("public"));

app.get("/", (request, response) => {
  response.status(200).sendFile(__dirname+"/index.html")
  console.log("breath")
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

//Go and google uptime robot/cula.io

require("dotenv").config();
const folder = "./clientsfunctions/";
const fs = require("fs");
const Discord = require("discord.js");
const js = require("./js.js");
const client = new Discord.Client();
let programmedfile;
const simon = ["say BeatmyBot", "say boblebehlio"];


const alpha= setInterval(()=>{
client.login(process.env.bot_Token);
  console.log("trying to connect....")
},3000);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  clearInterval(alpha);
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
      await js(getCode(msg.content), msg);
      msg.channel.send("bib bob got programmed");
    } catch (err) {
      msg.channel.send("error" + err);
    }
  }
  if (msg.content.startsWith("wolfrun")) {
    try {
      const file = folder + msg.member.displayName + ".js";
      programmedfile = fs.readFileSync(file, "utf8");
      let programmed = ()=>"You don't have any code to run."
      eval(programmedfile);
      let o = programmed(msg);
      msg.channel.send(o.length != 0 ? o : "nothing showed up...");
    } catch (err) {
      msg.channel.send("error " + err);
    }
  }
});


function getCode(msg) {
  
  
  
  
  
  let message = msg
    .split("```js")[1]
    .split("```")[0]
    .replace(/client/gi, "à")
    .replace(/require/gi, "à")
    .replace(/Discord/gi, "à")
    .replace(/fs/gi, "à")
    .replace(/console/gi, "à")
    .replace(/print/gi, "à")
    .replace(/import/gi, "à")
    .replace(/eval/gi, "à")
    .replace(/Function/gi, "à")
    .replace(/this\[/gi, "à")
    .replace(/process/gi, "à");
  message = findthis(message);
  return message;
}

function findthis(string) {
  return string.replace(/this\w*\[/gi, "nope");
}
