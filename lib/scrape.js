const cheerio = require('cheerio')
const fetch = require('node-fetch')
const axios = require('axios')
const qs = require('qs')
const fs = require('fs')
const chalk = require('chalk')
const { fromBuffer } = require('file-type')
const FormData = require('form-data')

module.exports = class Scraper {
  uploader = (buffer) => {
    return new Promise(async (resolve) => {
      try {
        const { ext } = await fromBuffer(buffer)
        const form = new FormData()
        form.append('file', buffer, 'tmp.' + ext)
        const json = await (await axios.post("https://tmpfiles.org/api/v1/upload", form, {
          headers: {
            "accept": "*/*",
            "accept-language": "id-ID , id; q=O. 9 , en- US ; q=0.8, en q=0.7",
            "content-type": "multipart/form-data",
            "origin": "https://tmpfiles.orgi",
            "referer": "https://tmpfiles.org/",
            "sec-ch-ua": '"Chromium";v="107", "Not=A?Brand";v="24"',
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "Android",
            "sec-fetch-dest": "empty",
            "sec-fetch-mcde": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
            "x-requested-with": "XMLHttpRequest",
            ...form.getHeaders()
          }
        })).data
        if (json.status != 'success') return resolve({
          developer: '© Dimas Triyatno',
          status: false,
          msg: 'Failed to uploaded'
        })
        resolve({
          developer: '© Dimas Triyatno',
          status: true,
          data: {
            url: json.data.url.replace('https://tmpfiles.org/', 'https://tmpfiles.org/dl/')
          }
        })
      } catch (e) {
        console.log(e)
        resolve({
          developer: '© Dimas Triyatno',
          status: false,
          msg: e.message
        })
      }
    })
  }

  uploaderV2 = async input => {
    return new Promise(async resolve => {
      try {
        const image = Buffer.isBuffer(input) ? input : input.startsWith('http') ? await (await axios.get(input, {
          responseType: 'arraybuffer'
        })).data : input
        let form = new FormData
        form.append('source', Buffer.from(image), 'image.jpg')
        form.append('type', 'file')
        form.append('action', 'upload')
        form.append('timestamp', (new Date() * 1))
        form.append('auth_token', '3b0ead89f86c3bd199478b2e14afd7123d97507f')
        form.append('nsfw', 0)
        const json = await (await axios.post('https://freeimage.host/json', form, {
          headers: {
            "Accept": "*/*",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
            "Origin": "https://freeimage.host",
            "Referer": "https://freeimage.host/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "sec-ch-ua": '"Chromium";v="107", "Not=A?Brand";v="24"',
            "sec-ch-ua-platform": "Android",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            ...form.getHeaders()
          }
        })).data
        if (json.status_code != 200) return resolve({
          creator: '© Dimas Triyatno',
          status: false,
          msg: `Failed to Upload!`
        })
        resolve({
          creator: '© Dimas Triyatno',
          status: true,
          original: json,
          data: {
            url: json.image.url
          }
        })
      } catch (e) {
        console.log(e)
        resolve({
          creator: '© Dimas Triyatno',
          status: false,
          msg: e.message
        })
      }
    })
  }
  
  shorten = async (url) => {
    let isurl = /https?:\/\//.test(url)
    return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url))).data : ''
  }
}