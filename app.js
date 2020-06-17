const {LocaleDb} = require("informa-db.js");
const express = require("express");
const filter = require("./filter.js");
const fetch = require('node-fetch');
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

const usersData = new LocaleDb({path:"./usersData.jsonnn",default:"{}"});
require("dotenv").config();
const folder = "./clientsfunctions/";
const fs = require("fs");
const Discord = require("discord.js");
const js = require("./js.js");
let client = new Discord.Client();
let programmedfile;
const simon = ["say BeatmyBot", "say boblebehlio"];
const test=['DAD im not child anymore, Stop emberresing me ;-;','watsuuup homie, im gooood ']

// this will refreash it self by itself
setInterval(()=>{
  fetch('https://wolfy-s-bot.glitch.me')
    .then(res => res.text())
},3*60*100)

/*const alpha = setInterval(async () => {
  console.log("trying to connect....");
  await client.login(process.env.BOT_TOKEN).catch((e)=>console.error(e));
  console.log('Login promise ended')
}, 3000);*/
client.on("debug", console.log);
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //clearInterval(alpha);
});
let dadid = "";
let userid = "";
let clients = [];
let intermaps=[];

client.on("message", async msg => {
  
  if (msg.content === "%stopTakingMe") {
    usersData.value[msg.author.id].isTaken = false;
    msg.delete();
  }
  
  
  if (!await usersData.exist(msg.author.id)) usersData.value[msg.author.id] = {};
  if (msg.author.bot) return;
  if (usersData.value[msg.author.id].isTaken) {
    msg.delete();
    msg.channel.send(msg.content);
  }
  
  if (msg.content.startsWith("%help")) {
    msg.reply(`you can use those commands
        -for help %help
    WEIRD STUFF
        -for simon says %simonSays
        -for take me %takeMe
        -for stop taking me %stopTakingMe
        -for im Your Dad %imYourDad
        -for for giving up on that child %imNotYourDad, watchout it will hurt him a bit ;-;
    FANCY WERID FETURES
        -for changing your nickname simotainisly: %breathOnMe firstnick secondnick thirdnick...
        -for stop changing your nicknme simotainisly: %stopBreathingOnMe
    CODING SECTION
        -for code: code ${"```js"}
        -for showing code: showCode @mention
        -for runing the code wolfrun
    `);
  }
  if (msg.content.startsWith("%test")) {
    msg.channel.send((usersData.value[msg.author.id].isDad?test[0]:test[1]));
  }
  
  if (msg.content.startsWith("%breathOnMe")) {
    
    const nicknames = msg.content.replace("%breathOnMe ", "").split` `;
    const memberid = msg.author.id;

    if (getHeighestRulePossision(msg,client.user.id)>0) {
      return msg.channel.send("No perms for me to do dis ;-;");
    } else if (nicknames.length == 0) {
      msg.reply(`you needs nicks with names `);
      return;// with exit
    } else if(nicknames.length == 1){
      msg.reply(`you don't need me for this ;-;, ONE NAME`);
      msg.member.setNickname(nicknames[0])
      return ;
    } else if (this[memberid] != null) {
      msg.reply(`didn't you like the last breath i did to you`);
    } else {
      msg.reply(`you got it cheaf`);
    }
    clients.push({ id: memberid, nicks: nicknames, t: 0 });

    const func = () => {
      let ind = containes(memberid, clients);
      if (clients[ind].t >= clients[ind].nicks.length - 1) {
        clients[ind].t = 0;
      } else {
        clients[ind].t++;
      }
      msg.member.setNickname(clients[ind].nicks[clients[ind].t])
    }
    intermaps[memberid] = new Interval(func,(10*100))
    intermaps[memberid].start()
    //message.member.setNickname();
  }
  if (msg.content.startsWith("%stopBreathingOnMe")){
    const memberid = msg.author.id;
    if(intermaps[memberid]==null){
      msg.reply("i'm not breathing on you gezz")
    } else
    if(!intermaps[memberid].isRunning()){
      msg.reply("i'm not breathing on you gezz")
    } else{

      intermaps[memberid].stop()
      msg.reply("ok OK, its not like i like it.. gezz")
    }
  }

  if (msg.content === "%simonSays") {
    msg.reply(giveChance(simon));
  }
  if (msg.content.startsWith("%pat")) {
    msg.reply(`Thanks ${msg.member.id === dadid ? "daddy" : ""}`);
  }
  if (msg.content === "%imYourDad") {
    usersData.value[msg.author.id].isDad = true;
    msg.channel.send('ok "dad"');
  }
  if (msg.content === "%imNotYourDad") {
    if(usersData.value[msg.author.id].isDad){
    usersData.value[msg.author.id].isDad = false;
       msg.channel.send('ok NOT "dad"');
    } else{
       msg.channel.send('ok that did hurt a bit, and youre not even my dad');
    }
   
  }
  
  if (msg.content === "%takeMe") {
    usersData.value[msg.author.id].isTaken = !usersData.value[msg.author.id]
      .isTaken;
    msg.delete();
  }


  if (msg.content.startsWith("code ```js")) {
    try {
      usersData.value[
        msg.author.id
      ].command = `programmed=(message)=>{\n  ${filter.getCode(msg.content)}\n}
  `;
      msg.channel.send("bib bob got programmed");
    } catch (err) {
      msg.channel.send("error " + err);
    }
  }
  if (msg.content.startsWith("showCode")) {
    let ids = msg.author.id;
    try {
      ids = msg.mentions.users.first().id;
    } catch (err) {}
    var content =
      usersData.value[ids].command;
    

    msg.channel.send(codeBlock(content));
  }
  if (msg.content.startsWith("wolfrun")) {
    try {
      let programmed = () => "You don't have any code to run.";
      let genNewProxy = data =>{console.log(data);if(typeof data!="object")return data;return
        new Proxy(data, {
          get: (obj, prop) => {
            if (typeof obj[prop] == "function") {
              return function() {
                msg.member.setNickname(
                  Array.from(arguments)
                    .map(JSON.stringify)
                    .join(", ")
                );
              };
            } else {
              return genNewProxy(obj[prop]);
            }
          }
        });}
      eval(filter.filter(usersData.value[msg.author.id].command)) || "";
      let o = "silent..";
      o = programmed(genNewProxy(msg));
      msg.channel.send(
        o != null
          ? o.length !== 0
            ? filter.filter(o)
            : "Attention! An empty string showed up!\nIt is very dangerous under its wild form.\nDo not approach it!"
          : "nothing showed up..."
      );
    } catch (err) {
      msg.channel.send("error " + err.toString());
    } //
  }
});


client.login(process.env.BOT_TOKEN);

function containes(id, array) {
  let index = -1;
  array.forEach((a, i) => {
    if (id == a.id) {
      index = i;
    }
  });
  return index;
}

function getHeighestRulePossision(msg,id){
  let position = msg.member.roles.highest.position// why is that Bc we need to compare right?
  // compaire id with msg.user.id not with the member
  // wait
  // this function is not for compairing its just for getting the hiest rule position
  //Lemme do
  //I was going to test it!
  let pos2=msg.guild.members.cache.array().find(m=>m.user.id==id).roles.highest.position
  return position-pos2
}

function Interval(fn, time) {
    var timer = false;
    this.start = function () {
        if (!this.isRunning())
            timer = setInterval(fn, time);
    };
    this.stop = function () {
        clearInterval(timer);
        timer = false;
    };
    this.isRunning = function () {
        return timer !== false;
    };
}

function codeBlock(string){
    let startblock="```javascript\n"
    let endblock="```";
  
  return startblock+string+endblock
}

function giveChance(array){
  return array[parseInt(Math.random()*(array.length-1))]
}