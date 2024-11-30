const { MessageType } = require('@whiskeysockets/baileys')
const { createHash } = require('crypto')

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function(m, { conn, text, usedPrefix }) {
  let __waktutionskh = new Date() - db.data.users[m.sender].snlast
  let _waktutionskh = +86400000 - __waktutionskh
  let waktutionskh = Func.toTime(_waktutionskh)
  if (new Date() - db.data.users[m.sender].snlast > +86400000) {
    db.data.users[m.sender].snlast = new Date() * 1
    db.data.users[m.sender].limit -= 5
    let sn = createHash('md5').update(m.sender).digest('hex')
    m.reply(`Your sn : ${sn}\n\n> Untuk mengunreg cukup ketik ${usedPrefix}unreg *sn_number*`)
  } else
    m.reply(`You have unregistered, wait another ${waktutionskh} to be able to unregister again.`)
}
handler.help = ['ceksn']
handler.tags = ['xp']
handler.command = ['ceksn']
handler.register = handler.limit = true

module.exports = handler