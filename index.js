const { prompt } = require('inquirer')
const mysql = require('mysql2')
require('console.table')

const db = mysql.createConnection('mysql://root:rootroot@localhost:3306/users_db')

const contCheck = () => {
  prompt({
    type: 'confirm',
    name: 'choice',
    message: 'Continue?'
  })
    .then(({ choice }) => choice ? menu() : process.exit())
    .catch(err => console.log(err))
}

async function getUsers () {
  const response = await new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (err, users) => {
      if (err) { reject(err) }
      resolve(users)
    })
  })
  return response
}

const viewUsers = () => {
  getUsers()
    .then(users => {
      console.table(users)
      contCheck()
    })
    .catch(err => console.log(err))
}

const createUser = () => {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter user\'s name:'
    }, {
      type: 'input',
      name: 'username',
      message: 'Enter user\'s username:'
    },
    {
      type: 'number',
      name: 'phone',
      message: 'Enter the user\'s phone:'
    },
    {
      type: 'confirm',
      name: 'isSignedIn',
      message: 'Is the user signed in?'
    }
  ])
    .then(user => {
      db.query('INSERT INTO users SET ?', user, err => {
        if (err) { console.log(err) }
        console.log('User added!')
        contCheck()
      })
    })
    .catch(err => console.log(err))
}
const deleteUser = () => {
  getUsers()
    .then(users => {
      prompt({
        type: 'list',
        name: 'id',
        message: 'Choose a user',
        choices: users.map(user => ({
          name: user.name,
          value: user.id
        }))
      })
        .then(id => {
          db.query('DELETE FROM users WHERE ?', id, err => {
            if (err) { console.log(err) }
            console.log('User deleted!')
            contCheck()
          })
        })
    })
    .catch(err => console.log(err))
}

const menu = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View all users', 'Create a user', 'Delete a user', 'EXIT']
  })
    .then(({ action }) => {
      switch (action) {
        case 'View all users':
          viewUsers()
          break
        case 'Create a user':
          createUser()
          break
        case 'Delete a user':
          deleteUser()
          break
        case 'EXIT':
          process.exit()
      }
    })
    .catch(err => console.log(err))
}

menu()

// db.query('SELECT * FROM users', (err, users) => {
//   if (err) { console.log(err) }
//   console.table(users)
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
