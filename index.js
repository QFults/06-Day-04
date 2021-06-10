const mysql = require('mysql2')

const db = mysql.createConnection('mysql://root:rootroot@localhost:3306/users_db')

// db.query('SELECT * FROM users', (err, users) => {
//   if (err) { console.log(err) }
//   console.log(users)
// })

// const condition = { isSignedIn: false }

// db.query('SELECT * FROM users WHERE ?', condition, (err, users) => {
//   if (err) { console.log(err) }
//   console.log(users)
// })

// const condition = [false, 1234567890]

// db.query('SELECT * FROM users WHERE isSignedIn = ? AND phone = ?', condition, (err, users) => {
//   if (err) { console.log(err) }
//   console.log(users)
// })

// const user = {
//   name: 'Jimmy Doe',
//   username: 'jimmydoe',
//   phone: 1231231231,
//   isSignedIn: true
// }

// db.query('INSERT INTO users SET ?', user, err => {
//   if (err) { console.log(err) }
// })

// const condition = [{ isSignedIn: true }, { id: 3 }]

// db.query('UPDATE users SET ? WHERE ?', condition, err => {
//   if (err) { console.log(err) }
// })

// const condition = { id: 4 }

// db.query('DELETE FROM users WHERE ?', condition, err => {
//   if (err) { console.log(err) }
// })
