let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Apanya yang benar?')
  let jawab = ['Iya', 'Sudah pasti', 'Sudah pasti benar', 'Tidak', 'Tentu tidak', 'Sudah pasti tidak']
  let json = Func.random(jawab)
  conn.sendTextWithMentions(m.chat, `*Pertanyaan* : ${text}\n*Jawaban* : ${json}`, m)
}
handler.help = ['benarkah']
handler.tags = ['fun']
handler.command = /^bene?a?r(kah)?$/i

module.exports = handler