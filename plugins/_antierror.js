let handler = m => m
handler.all = async function (m) {
  let user = global.db.data.users[m.sender]
  if ((user.money * 1) > 999999999999999999) {
    user.money = 999999999999999999
  } else if ((user.money * 1) < 0) {
    user.money = 0
  }
  
  if ((user.exp * 1) > 999999999999999999999999999) {
    user.exp = 999999999999999999999999999
  } else if ((user.exp * 1) < 0) {
    user.exp = 0
  }
  
  if ((user.limit * 1) > 999999999999999999) {
    user.limit = 999999999999999999
  } else if ((user.limit * 1) < 0) {
    user.limit = 0
  }
}

module.exports = handler