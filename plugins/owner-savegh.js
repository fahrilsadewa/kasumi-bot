const fs = require('fs')
const axios = require('axios')
const REPO_NAME = 'kasumi-bot'

let handler = async (m, { conn, text, usedPrefix, command, __dirname }) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, 'filePath/example.js'))
  if (!m.quoted) return m.reply(Func.texted('bold', 'Reply code!'))

  if (!global.key.github_owner || !global.key.github_token) {
    return m.reply('GitHub configuration is missing. Set GITHUB_OWNER and GITHUB_TOKEN.')
  }
  
  const getFileSHA = async (githubPath) => {
    try {
      const url = `https://api.github.com/repos/${global.key.github_owner}/${REPO_NAME}/contents/${githubPath}`
      const response = await axios.get(url, {
        headers: {
          Authorization: `token ${global.key.github_token}`,
        },
      })
      return response.data.sha
    } catch (error) {
      if (error.response?.status === 404) return null
      throw new Error(`Gagal mendapatkan SHA file: ${error.response?.data?.message || error.message}`)
    }
  }

  const uploadFileToGitHub = async (content, fileName, folderPath = '') => {
    try {
      const githubPath = folderPath ? `${folderPath}/${fileName}` : fileName
      const url = `https://api.github.com/repos/${global.key.github_owner}/${REPO_NAME}/contents/${githubPath}`

      const sha = await getFileSHA(githubPath)

      const response = await axios.put(url, {
        message: `Update file ${fileName}`,
        content: content,
        branch: global.key.github_branch,
        ...(sha && { sha }),
      }, {
        headers: {
          Authorization: `token ${global.key.github_token}`,
        },
      })

      const fileUrl = `https://github.com/${global.key.github_owner}/${REPO_NAME}/blob/${global.key.github_branch}/${githubPath}`
      return `File ${fileName} berhasil diupload ke GitHub!\n\nPath: ${response.data.content.path}\nURL: ${fileUrl}`
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
      const pathFile = ''
      const result = await uploadFileToGitHub(base64Content, filename, pathFile)
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