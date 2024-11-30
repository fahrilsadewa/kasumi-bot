let handler = async (m, { conn, command }) => {
  if (command == 'limit') {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') return m.reply('User does not exist in the database')
    m.reply(`${global.db.data.users[who].limit} Limit Left ಥ_ಥ`)
  } else if (command == 'exp') {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') return m.reply('User does not exist in the database')
   m.reply(`${global.db.data.users[who].exp} total`)
  } else if (command == 'level') {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
    conn.reply(m.chat, `Level @${who.split(`@`)[0]} *${user.level}*`, m, { mentions: [who] })
  } else if (command == 'role') {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') return m.reply('User does not exist in the database')
    m.reply(`Your role ${global.db.data.users[who].role}`)
  } else if (command == 'money') {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') return m.reply('User does not exist in the database')
    m.reply(`${global.db.data.users[who].money} total`)
  }
}
handler.help = handler.command = ['limit', 'exp', 'level', 'role', 'money']
handler.tags = ['xp']
handler.limit = true

module.exports = handler