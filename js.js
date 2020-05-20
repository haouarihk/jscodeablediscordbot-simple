const fs = require('fs')
const folder = './clientsfunctions/'
module.exports = async (message, msg) => {
    await writeFile(message, msg);
    return true
}

function writeFile(messageCode, msg) {
    const file = folder + msg.member.displayName + '.js'
    const main = `
    programmed=(message)=>{
        ${messageCode}
    }    
`  
    if (!fs.existsSync(folder)) {
        fs.appenddirectory(folder,()=>{
        }) 
    }//I think it can
        //although as a fallback i made it myself
    return fs.writeFileSync(file, main,"utf-8",()=>{});
}