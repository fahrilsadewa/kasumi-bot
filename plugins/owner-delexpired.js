let handler = async (m, { conn, args, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = args[1] ? args[1] : m.chat
  else who = args[1]
  if (new Date() * 1 < global.db.data.chats[who].expired)
  global.db.data.chats[who].expired = undefined
  else global.db.data.chats[who].expired = undefined
  conn.reply(m.chat, 'Berhasil menghapus hari kadaluarsa untuk Grup ini', m)
}
handler.help = handler.command = ['delexpired']
handler.tags = ['owner']
handler.rowner = handler.group = true

module.exports = handler

function msToDate(ms) {
  let temp = ms
  let days = Math.floor(ms / (24 * 60 * 60 * 1000))
  let daysms = ms % (24 * 60 * 60 * 1000)
  let hours = Math.floor(daysms / (60 * 60 * 1000))
  let hoursms = ms % (60 * 60 * 1000)
  let minutes = Math.floor(hoursms / (60 * 1000))
  let minutesms = ms % (60 * 1000)
  let sec = Math.floor(minutesms / 1000)
  return days + ' hari ' + hours + ' jam ' + minutes + ' menit'
  // +minutes+':'+sec
}