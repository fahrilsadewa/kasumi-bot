let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `Silahkan masukan laporan kamu\n\nContoh: ${usedPrefix + command} Lapor pengguna mengirim foto bokep tolong di tindak.`, m)
  if (text > 300) return conn.reply(m.chat, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', m)
  const teks1 = `*[ REPORT ]*\nNomor : wa.me/${m.sender.split("@s.whatsapp.net")[0]}\nPesan : ${text}`
  conn.reply(owner[0] + '@s.whatsapp.net', teks1, m)
  conn.reply(m.chat, 'Masalah berhasil dikirimkan ke Owner', m)
}
handler.help = handler.command = ['report']
handler.tags = ['info']
handler.private = true

module.exports = handler