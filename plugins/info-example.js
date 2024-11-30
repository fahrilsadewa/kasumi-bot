let handler = async (m, { conn, usedPrefix, command, text }) => {
  try {
    if (!text) {
      if (m.isGroup) {
        let jaw = '*Silakan pilih dari daftar.*\n\n'
        jaw += `*${usedPrefix + command} 1*\n`
        jaw += '_Contoh kode untuk Plugin Event 1_\n\n'
        jaw += `*${usedPrefix + command} 2*\n`
        jaw += '_Contoh kode untuk Plugin Event 2_\n\n'
        jaw += `*${usedPrefix + command} 3*\n`
        jaw += '_Contoh kode untuk Plugin Event 3_\n\n'
        jaw += global.set.footer 
        return m.reply(jaw)
      } else {
        const sections = [
          {
            title: "Silakan di pilih",
            rows: [
              {
                title: "Example 1",
                rowId: `${usedPrefix + command} 1`,
                description: "Contoh kode untuk Plugin Event 1"
              },
              {
                title: "Example 2",
                rowId: `${usedPrefix + command} 2`,
                description: "Contoh kode untuk Plugin Event 2"
              },
              {
                title: "Example 3",
                rowId: `${usedPrefix + command} 3`,
                description: "Contoh kode untuk Plugin Event 3"
              }
            ]
          },
          {
            title: "Donasi",
            rows: [
              {
                title: "Donasi Sekarang",
                rowId: "donation",
                description: "Bantu kami dengan donasi"
              },
              {
                title: "Tentang Kami",
                rowId: "about",
                description: "Informasi tentang pengembang"
              }
            ]
          }
        ]

        const listMessage = {
          text: "Pilih salah satu contoh di bawah:",
          footer: global.set.wm,
          title: "Contoh Kode",
          buttonText: "Touch me >//<",
          sections
        }

        return await conn.sendMessage(m.chat, listMessage, { quoted: m })
      }
    }

    const responseMap = {
      '1': `*Plugins Event 1*\n\n\`\`\`javascript\nlet handler = async (m, { conn }) => {\n  try {\n    // Example 1 kode di sini...\n  } catch (e) {\n    console.log(e)\n    return conn.reply(m.chat, Func.jsonFormat(e), m)\n  }\n}\nhandler.help = ['help_command']\nhandler.tags = ['tags_command']\nhandler.command = /^(command_regex)$/i // bisa juga handler.command = ['command']\nlimit = true\n\nmodule.exports = handler\n\`\`\``,
      '2': `*Plugins Event 2*\n\n\`\`\`javascript\nmodule.exports = {\n  run: async (m, { conn }) => {\n    try {\n      // Example 2 kode di sini...\n    } catch (e) {\n      console.log(e)\n      return conn.reply(m.chat, Func.jsonFormat(e), m)\n    }\n  },\n  help: ['help_command'],\n  tags: ['tags_command'],\n  command: /^(command)$/i,\n  limit: true\n}\n\`\`\``,
      '3': `*Plugins Event 3*\n\n\`\`\`javascript\nmodule.exports = Object.assign(async function handler(m, { conn }) {\n  try {\n    // Example 3 kode di sini...\n  } catch (e) {\n    console.log(e)\n    return conn.reply(m.chat, Func.jsonFormat(e), m)\n  }\n}, {\n  help: ['help_command'],\n  tags: ['tags_command'],\n  command: ['command'],\n  limit: true\n})\n\`\`\``
    }

    if (responseMap[text.toLowerCase()]) {
      return conn.reply(m.chat, responseMap[text.toLowerCase()], m)
    }

    return conn.reply(m.chat, 'Pilihan tidak valid. Ketik perintah tanpa opsi untuk melihat menu.', m)
  } catch (e) {
    console.log(e)
    return conn.reply(m.chat, Func.jsonFormat(e), m)
  }
}
handler.help = ['example']
handler.tags = ['info']
handler.command = /^(example|ex)$/i

module.exports = handler