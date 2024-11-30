let handler = async (m, { isOwner, isAdmin, conn, text, participants }) => {
  let fkonn = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}),
    },
    message: {
      contactMessage: {
        displayName: `${m.name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${m.name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  }
  let teksnya = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
  var hid = await conn.groupMetadata(m.chat)
  conn.sendMessage(m.chat, {
    text: teksnya,
    mentions: hid.participants.map((a) => a.id),
  }) //, {quoted: fkonn})
}
handler.help = ['hidetag']
handler.tags = ['group']
handler.command = ['hidetag', 'h']
handler.admin = handler.group = true

module.exports = handler