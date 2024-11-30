const fs = require('fs')
const path = require('path')
const axios = require('axios')

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, 'filePath/example.js'))
  if (!m.quoted) return m.reply(Func.texted('bold', 'Reply code!'))
  const REPO_NAME = 'kasumi-bot'
  
  const readFileAsBase64 = (filePath) => {
    const fileData = fs.readFileSync(filePath)
    return fileData.toString('base64')
  }

  const uploadFileToGitHub = async (content, fileName, folderPath = '') => {
    try {
      const githubPath = folderPath ? `${folderPath}/${fileName}` : fileName
      const url = `https://api.github.com/repos/${global.key.github_owner}/${REPO_NAME}/contents/${githubPath}`
      const response = await axios.put(url, {
        message: `Upload file ${fileName}`,
        content: content,
        branch: global.key.github_branch,
      }, {
        headers: {
          Authorization: `token ${global.key.github_token}`,
        },
      })
      return `File ${fileName} berhasil diupload ke GitHub! Path: ${response.data.content.path}`
    } catch (error) {
      throw new Error(`Gagal mengupload file ${fileName}: ${error.response?.data?.message || error.message}`)
    }
  }
  
  if (/g(ithub)?/i.test(command)) {
    const filename = text.replace(/github(s)?\//i, '') + (/\.js$/i.test(text) ? '' : '.js')
    const error = require('syntax-error')(m.quoted.text, filename, {
      sourceType: 'module',
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
    })
    if (error) return m.reply(`Syntax Error:\n${error}`)
    const base64Content = Buffer.from(m.quoted.text).toString('base64')
    try {
      const result = await uploadFileToGitHub(base64Content, filename, 'plugins')
      m.reply(result)
    } catch (err) {
      m.reply(err.message)
    }
  } else if (m.quoted.mediaMessage) {
    const media = await m.quoted.download()
    const base64Content = Buffer.from(media).toString('base64')
    try {
      const result = await uploadFileToGitHub(base64Content, text, 'uploads')
      m.reply(result)
    } catch (err) {
      m.reply(err.message)
    }
  } else {
    return m.reply('Jenis file tidak didukung!')
  }
}
handler.help = ['savegithub']
handler.tags = ['owner']
handler.command = /^(sg|savegithub)$/i
handler.rowner = true

module.exports = handler