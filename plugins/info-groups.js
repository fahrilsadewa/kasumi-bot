let handler = async (m, { conn, participants }) => {
  let now = new Date() * 1
  let groups = Object.entries(conn.chats)
    .filter(([jid, chat]) => 
      jid.endsWith('@g.us') && 
      chat.isChats && 
      !chat.metadata?.read_only && 
      !chat.metadata?.announce
    )
    .map(v => v[0])

  let txt = ''
  for (let [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) {
    txt += `◎ ${await conn.getName(jid)}\n` + 
      `${jid} [${chat?.metadata?.read_only ? 'Left' : 'Joined'}]\n` + 
      `${db.data.chats[jid] === undefined ? db.data.chats[jid] = { 
        isBanned: false, 
        welcome: true,
        antiLink: false,
        delete: false
      } : db.data.chats[jid].expired ? msToDate(db.data.chats[jid].expired - now) : '*NOT SET*'}\n` + 
    `${db.data.chats[jid].isBanned ? '✅' : '❌'} _Group Banned_\n` + 
    `${db.data.chats[jid].welcome ? '✅' : '❌'} _Auto Welcome_\n` + 
    `${db.data.chats[jid].antiLink ? '✅' : '❌'} _Anti Link_\n\n`
  }
  m.reply(`⼷ *List Group*\n\n` + 
    `Total Group: ${groups.length}\n\n` + 
    `${txt}`.trim()
  )
}
handler.help = ['groups']
handler.tags = ['info']
handler.command = ['groups', 'listgc']

module.exports = handler

function msToDate(ms) {
  let days = Math.floor(ms / (24 * 60 * 60 * 1000))
  let daysms = ms % (24 * 60 * 60 * 1000)
  let hours = Math.floor(daysms / (60 * 60 * 1000))
  let hoursms = ms % (60 * 60 * 1000)
  let minutes = Math.floor(hoursms / (60 * 1000))
  let minutesms = ms % (60 * 1000)
  let sec = Math.floor(minutesms / 1000)
  return `${days} hari ${hours} jam ${minutes} menit`
}