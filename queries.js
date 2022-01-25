const Pool = require('pg').Pool

//TODO: read docs, I think there's a better way to config these by naming the env vars
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})

const getUsers = (req, res) => {
  if (req.params.id === undefined) {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }
  else {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }
}

const createUser = (req, res) => {
    const { firstname, lastname, email, dob, street, city, state, zip, phone } = req.body

    pool.query('INSERT INTO users (firstname, lastname, email, dob, street, city, state, zip, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id', [firstname, lastname, email, dob, street, city, state, zip, phone], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

  //must provide data for every param (or it will be updated to null in db)
  const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { firstname, lastname, email, dob, street, city, state, zip, phone } = req.body

    pool.query(
      'UPDATE users SET firstname = $2, lastname = $3, email = $4, dob = $5, street = $6, city = $7, state = $8, zip = $9, phone = $10 WHERE id = $1',
      [id, firstname, lastname, email, dob, street, city, state, zip, phone],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  }