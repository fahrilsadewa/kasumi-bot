let handler = (m) => m
handler.before = async (m, { conn, isPrems, owner }) => {
  let user = db.data.users[m.sender]
  if (m.chat.endsWith("broadcast")) return
  if (user.premiumTime != 0 && user.premium) {
    if (new Date() * 1 >= global.db.data.users[m.sender].premiumTime) {
      conn.reply(m.chat, 'Your premium has expired, if you are interested in upgrading your premium again, please contact the owner.', m).then(() => {
        db.data.users[m.sender].premium = false
        db.data.users[m.sender].premiumTime = 0
        this.sendContact(m.chat, [
          { 
            name: global.owner_name, 
            number: global.owner, 
            about: 'Owner & Creator' 
          }
        ], m, { 
          org: 'Contacts Support', 
          website: 'https://api.ssateam.my.id', 
          email: 'dev@ssateam.my.id' 
        })
      })
    }
  }
}

module.exports = handler