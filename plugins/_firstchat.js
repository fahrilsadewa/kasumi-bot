let handler = m => m
handler.before = async function(m) {
  if (m.chat.endsWith('broadcast')) return
  if (m.fromMe) return
  if (m.isGroup) return
  let user = global.db.data.users[m.sender]
  let { banned } = db.data.users[m.chat]
  let username = conn.getName(m.sender)
  if (new Date - user.pc < 86400000) return // setiap 24 jam sekali
  conn.sendMessageModify(m.chat, `Oh hi ${m.name} ${await Func.greeting()} Can I help you?\nI am a whatsapp bot that can help you to do small activities such as making stickers downloading media only through whatsapp.`, m, {
    largeThumb: true,
    url: db.data.settings[conn.user.jid].link
  })
  user.pc = new Date * 1
}

module.exports = handler