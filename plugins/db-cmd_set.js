let handler = async (m, { conn, text, usedPrefix, command }) => {
  db.data.sticker = db.data.sticker || {}
  if (!m.quoted) return m.reply(`Balas stiker dengan perintah *${usedPrefix + command}*`)
  if (!m.quoted.fileSha256) return m.reply('SHA256 Hash Missing')
  if (!text) return m.reply(`Penggunaan: ${usedPrefix + command} <teks>\n\nContoh: ${usedPrefix + command} tes`)
  let sticker = db.data.sticker
  let hash = m.quoted.fileSha256.toString('base64')
  if (sticker[hash] && sticker[hash].locked) return m.reply('Kamu tidak memiliki izin untuk mengubah perintah stiker ini')
  sticker[hash] = {
    text,
    mentionedJid: m.mentionedJid,
    creator: m.sender,
    at: +new Date,
    locked: false,
  }
  m.reply(`Berhasil!`)
}
handler.help = ['cmd'].map(v => 'set' + v + ' ')
handler.tags = ['database']
handler.command = ['setcmd']
handler.premium = 1

module.exports = handler