const Pool = require('pg').Pool

const { user,host,database,password,db_port } = require('./config')
const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: db_port,
})

const utilities = require('./utilities')

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserByName = (request, response) => {
  const name = request.params.name
  reply = "Happy Birthday!"

  
  pool.query('SELECT * FROM users WHERE name = $1', [name], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows[0] == null){
      response.status(404).send(`Not found`)
    } else {
      if (utilities.isDateToday(new Date(results.rows[0].birthday))) {
        reply = "Happy Birthday!"
        } else {
        diffDays = utilities.howManyDays(new Date(),new Date(results.rows[0].birthday))
        reply = "Your Birthday is in "+diffDays+" day(s)!"
        }
      response.status(200).send(`Hello, ${name}! `+reply)
    }
  })
}

const createUser = (request, response) => {
  const name = request.params.name
  const birthdayDate = request.body.dateOfBirth
  console.log(birthdayDate)
  
  if (!utilities.isDateBeforeToday(new Date(birthdayDate))) {
    response.status(400).send(`Birthday Date not valid ${birthdayDate}`)
  } else if (!utilities.isOnlyLetters(name)) {
    response.status(400).send(`Name not valid ${name}`)
  } else {
    pool.query('INSERT INTO users (name, birthday) VALUES ($1, $2) ON CONFLICT (name) DO UPDATE SET birthday= $2', [name, birthdayDate], (error, results) => {
      if (error) {
          throw error
        }
        response.status(204).send(`User added with birthday: ${birthdayDate}`)
      })
  }
}


module.exports = {
  getUsers,
  getUserByName,
  createUser
}
