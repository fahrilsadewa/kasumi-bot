let { MessageType } = require('@whiskeysockets/baileys')

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, Func.example(usedPrefix, command, '62xx'), m)
  text = no(text) + "@s.whatsapp.net"
  global.db.data.users[text].premium = false
  global.db.data.users[text].premiumTime = 0
  conn.reply(m.chat, `Berhasil menghapus akses premium @${text.split('@')[0]}.`, m, { 
    contextInfo: { 
      mentionedJid: [text] 
    } 
  })
}
handler.help = handler.command = ['delprem']
handler.tags = ['owner']
handler.owner = true

module.exports = handler

async function no(number) {
  return number.replace(/\s/g, '').replace(/([@+-])/g, '')
}