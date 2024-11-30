let handler = async (m, { conn }) => {
  conn.sendContact(m.chat, [{
    name: global.owner_name,
    number: global.owner,
    about: 'Owner & Creator'
  }], m, {
    org: 'Contacts Support',
    website: 'https://api.ssateam.my.id',
    email: 'dev@ssateam.my.id'
 })
}
handler.help = ['owner']
handler.tags = ['info']
handler.command = ['owner', 'creator']

module.exports = handler