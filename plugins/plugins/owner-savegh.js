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
      throw new Error(`Failed to get file SHA: ${error.response?.data?.message || error.message}`)
    }
  }

  const uploadFileToGitHub = async (content, fileName, folderPath = '') => {
    try {
      const finalFileName = /\.(js|json|txt|md)$/i.test(fileName) ? fileName : `${fileName}.js`
      const githubPath = folderPath ? `${folderPath}/${finalFileName}` : finalFileName

      const url = `https://api.github.com/repos/${global.key.github_owner}/${REPO_NAME}/contents/${githubPath}`

      const sha = await getFileSHA(githubPath)

      const response = await axios.put(url, {
        message: `Update file ${finalFileName}`,
        content: content,
        branch: global.key.github_branch,
        ...(sha && { sha }),
      }, {
        headers: {
          Authorization: `token ${global.key.github_token}`,
        },
      })

      const fileUrl = `https://github.com/${global.key.github_owner}/${REPO_NAME}/blob/${global.key.github_branch}/${githubPath}`
      return `File ${finalFileName} successfully uploaded to GitHub!\n\nPath: ${response.data.content.path}\nURL: ${fileUrl}`
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.response?.data?.message || error.message}`)
    }
  }

  try {
    let base64Content, 
    filename, 
    uploadPath
    if (/g(ithub)?/i.test(command)) {
      filename = text.replace(/github(s)?\//i, '') 
      filename = /\.js$/i.test(filename) ? filename : `${filename}.js`

      const error = require('syntax-error')(m.quoted.text, filename, {
        sourceType: 'module',
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true,
      })
      if (error) return m.reply(`Syntax Error:\n${error}`)

      base64Content = Buffer.from(m.quoted.text).toString('base64')
      uploadPath = 'plugins'
    } else if (m.quoted.mediaMessage) {
      const media = await m.quoted.download()
      base64Content = Buffer.from(media).toString('base64')
      filename = text
      uploadPath = 'uploads'
    } else {
      return m.reply('Unsupported file type!')
    }

    const result = await uploadFileToGitHub(base64Content, filename, uploadPath)
    m.reply(result)
  } catch (err) {
    m.reply(`Upload failed: ${err.message}`)
  }
}

handler.help = ['savegithub <path>']
handler.tags = ['owner']
handler.command = /^(sg|savegithub)$/i
handler.rowner = true

module.exports = handler