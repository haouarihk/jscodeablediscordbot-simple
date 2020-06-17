function filter(message){
  let msg = findthis(message);
  msg = filterBadWords(msg);
  return msg
}
function getCode(msg){
  return   msg
    .split("```js")[1]
    .split("```")[0]
    .replace(/client/gi, "à")
    .replace(/require/gi, "à")
    .replace(/msg/gi, "à")
    .replace(/Discord/gi, "à")
    .replace(/fs/gi, "à")
    .replace(/console/gi, "à")
    .replace(/print/gi, "à")
    .replace(/import/gi, "à")
    .replace(/eval/gi, "à")
    .replace(/Function/gi, "à")
    .replace(/this\[/gi, "à")
    .replace(/process/gi, "à");
  
}



module.exports.getCode=getCode;
module.exports.filter=filter;

function findthis(string) {
  return string.toString().replace(/this\w*\[/gi, "nope");
}
function filterBadWords(string) {
  return string
    .split(/fuck/gi)
    .join("f**k")
    .split(/shit/gi)
    .join("s**t");
}