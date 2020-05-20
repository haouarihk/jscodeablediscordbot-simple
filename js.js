const fs = require('fs')
const folder = './clientsfunctions/'
module.exports = async (message, msg) => {
    await writeFile(message, msg);
    return true
}

async function writeFile(messageCode, msg) {
    const file = folder + msg.member.displayName + '.js'
    const main = `
    programmed=(message)=>{
        ${messageCode}
    }    
`  
    if (!fs.existsSync(folder)) {
        fs.appenddirector(folder,()=>{
          
        })
    }//Write file does this
    return await fs.writeFile(file, main,"utf-8");
}