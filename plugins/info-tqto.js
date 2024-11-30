module.exports = {
  run: async (m, { conn }) => {
    try {
      let teks = '⼷ *Big Thanks To*\n\n'
      teks += '◎ Neoxr (my inspiration)\n'
      teks += '◎ Nando (my inspiration)\n'
      teks += '◎ Fainshe (partner beban)\n'
      teks += '◎ Dims\n'
      teks += '◎ Ssa Team\n\n'
      teks += global.set.footer
      let fake = { 
        key: { 
          //remoteJid: 'status@broadcast', 
          participant: '0@s.whatsapp.net' 
        }, 
        message: { 
          orderMessage: {
            itemCount: 2018,
            status: 1,
            thumbnail: await conn.resize(await conn.getBuffer("https://i.ibb.co/QkmRhLJ/image.jpg"), 100, 100),
            surface: 1, 
            message: global.header,
            orderTitle: 'hai', 
            sellerJid: '0@s.whatsapp.net'
          }
        }
      }
      conn.sendMessageModify(m.chat, teks, m, {
        largeThumb: true,
        thumbnail: 'https://i.ibb.co/F4ytDMz/image.jpg'
      })
    } catch (e) {
      return conn.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  help: ['tqto'],
  tags: ['info'],
  command: /^(tqto|thanksto|cr|credits)$/i
}