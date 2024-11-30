const axios = require('axios')
const fs = require('fs')

module.exports = {
  run: async (m, { conn, text, usedPrefix, command, users }) => {
    try {
      let q = m.quoted ? m.quoted : m
      let mime = (q.msg || q).mimetype || ''
      if (!mime) return m.reply('Perihal apah')
      m.react('🕛')
      let media = await q.download()
      /*let maxFileSize = 25 * 1024 * 1024
      if (media.length > maxFileSize) return m.reply(`⚠️ File terlalu besar! Ukuran maksimum adalah 25 MB.\nFile Anda: ${(media.length / (1024 * 1024)).toFixed(2)} MB.`)*/
      let fileName = `${Date.now()}.${mime.split('/')[1]}`
      let filePath = `uploads/${fileName}`
      let base64Content = Buffer.from(media).toString('base64')
      let response = await axios.put(`https://api.github.com/repos/${global.key.github_owner}/${global.key.github_repo}/contents/${filePath}`, {
        message: `Upload file ${fileName}`, 
        content: base64Content,
        branch: global.key.github_branch,
      }, {
        headers: {
          Authorization: `Bearer ${global.key.github_token}`,
          'Content-Type': 'application/json',
        },
      })
      let rawUrl = `https://raw.githubusercontent.com/${global.key.github_owner}/${global.key.github_repo}/${global.key.github_branch}/${filePath}`
      m.reply(`File berhasil diupload ke GitHub!\nRaw URL: ${rawUrl}`)
    } catch (e) {
      console.error(e)
      return conn.reply(m.chat, `Error: ${e.message}`, m)
    }
  },
  help: ['uploadtogithub'],
  tags: ['tools'],
  command: /^(uploadtogithub|togh)$/i,
  owner: true
}