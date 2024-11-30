let handler = async (m, { conn, text, isOwner, isAdmin, usedPrefix, command }) => {
  if (text) {
    if (!(isAdmin || isOwner)) return m.reply(status.admin)
    db.data.chats[m.chat].sBye = text
    m.reply('Bye berhasil diatur\n@user (Mention)')
  } else return m.reply(`Penggunaan: ${usedPrefix + command} <teks>\n\nContoh: ${usedPrefix + command} byebye @user`)
}
handler.help = handler.command = ['setbye']
handler.tags = ['group']
handler.group = handler.admin = true

module.exports = handler