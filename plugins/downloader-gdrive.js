module.exports = {
  run: async (m, { conn, args, usedPrefix, command, users }) => {
    if (!args || !args[0]) return conn.reply(m.chat, Func.example(usedPrefix, command, 'https://drive.google.com/file/d/1YTD7Ymux9puFNqu__5WPlYdFZHcGI3Wz/view?usp=drivesdk'), m)
    if (!/^(?:https?:\/\/)?(?:drive\.google\.com)\/(?:file\/d\/|uc\?id=)?([\w\-_]+)(?:\/)?(?:view)?(?:\?usp=.*?)?$/.test(args[0])) return m.reply(status.invalid)
    m.react('🕒')
    try {
      const loli = await Func.fetchJson(API('nea', '/api/downloader/gdrive', { url: args[0] }))
      const chSize = Func.sizeLimit(loli.fileSize, users.premium ? global.max_upload : global.max_upload_free)
      const isOver = users.premium ? `💀 File size (${loli.fileSize}) exceeds the maximum limit, download it by yourself via this link : ${await (await scrap.shorten(loli.downloadUrl)).data.url}` : `⚠️ File size (${loli.fileSize}), you can only download files with a maximum size of ${global.max_upload_free} MB and for premium users a maximum of ${global.max_upload} MB.`
      if (chSize.oversize) return conn.reply(m.chat, isOver, m)
      conn.sendFile(m.chat, loli.downloadUrl, loli.fileName, loli.mimeType, m)
    } catch (e) {
      console.log(e)
      return conn.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  help: ['gdrive'],
  tags: ['downloader'],
  command: /^(gdrive)$/i,
  limit: true
}