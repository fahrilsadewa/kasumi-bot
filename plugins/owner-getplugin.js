let handler = async (m, { conn, usedPrefix, command, text }) => {
  let ar = Object.keys(plugins)
  let ar1 = ar.map(v => v.replace('.js', ''))
  if (!text) return m.reply(Func.example(usedPrefix, command, 'menu'))
  if (!ar1.includes(text)) return m.reply(`'${text}' tidak ditemukan!\n\n${ar1.map(v => ' ' + v).join`\n`}`)
  let anuh = await require('fs').readFileSync('./plugins/' + text + '.js', 'utf-8')
  conn.reply(m.chat, anuh, m, {
    useModify: true,
    largeThumb: true,
    thumbnail: 'https://pomf2.lain.la/f/9y00m375.jpg'
  })
}
handler.help = ['getplugin'].map(v => v + ' ')
handler.tags = ['owner']
handler.command = ['gp', 'getplugin']
handler.owner = true

module.exports = handler