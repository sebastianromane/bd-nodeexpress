require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowExitOnIdle: true
})

const getDate = async () => {
const result = await pool.query("SELECT NOW()")
console.log(result)
}
getDate()

const agregarLikes = async (payload) => {
    const SQLquery = {
      text: 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [
        payload.titulo,
        payload.url,
        payload.descripcion,
        payload.likes,
        ]
    }
    try {
      
      const result = await pool.query(SQLquery)
      return result.rows
    } catch (e) {
      throw new Error(e)
    }
  }