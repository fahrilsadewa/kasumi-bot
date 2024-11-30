let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Apanya yang bisa?')
  let jawab = ['Iya', 'Bisa', 'Tentu saja bisa', 'Tentu bisa', 'Sudah pasti', 'Sudah pasti bisa', 'Tidak', 'Tidak bisa', 'Tentu tidak', 'tentu tidak bisa', 'Sudah pasti tidak']
  let json = Func.random(jawab)
  conn.sendTextWithMentions(m.chat, `*Pertanyaan* : ${text}\n*Jawaban* : ${json}`, m)
}
handler.help = ['bisakah']
handler.tags = ['fun']
handler.command = /^bisa(kah)?$/i

module.exports = handler