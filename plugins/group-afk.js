let handler = async (m, { text }) => {
  let user = global.db.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  m.reply(`${conn.getName(m.sender)} is now AFK${text ? ': ' + text : ''}`)
}
handler.help = handler.command = ['afk']
handler.tags = ['group']

module.exports = handler