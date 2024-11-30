let handler = async (m, { command, text }) => {
  try {
    let ter = command[1].toLowerCase()
    let txt = m.quoted ? m.quoted.text ? m.quoted.text: text ? text: m.text: text ? text: m.text
    await m.reply(txt.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase()))
  } catch (e) {
    console.log(e)
    return m.reply(status.error)
  }
}
handler.help = [...'aiueo'].map(v => `h${v}l${v}h`)
handler.tags = ['fun']
handler.command = /^h([aiueo])l\1h/i

module.exports = handler