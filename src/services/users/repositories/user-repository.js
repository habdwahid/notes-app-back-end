import bcrypt from 'bcrypt'
import {nanoid} from 'nanoid'
import {Pool} from 'pg'

class UserRepositories {
  constructor() {
    this.pool = new Pool()
  }

  /**
   * Add or insert a new user into storage
   * 
   * @param {Object} user
   * @param {String} user.username
   * @param {String} user.password
   * @param {String} user.fullname
   * @returns {String} id
   */
  async createUser({username, password, fullname}) {
    const id = nanoid(16)
    const hashedPassword = await bcrypt.hash(password, 10)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    // Insert user query
    const query = {
      text: 'INSERT INTO users(id, username, password, fullname, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, username, hashedPassword, fullname, createdAt, updatedAt]
    }

    // Inserting new user into storage
    const result = await this.pool.query(query)

    return result.rows[0]
  }

  /**
   * Check username are already used
   * 
   * @param {String} username
   * @returns {Number} username
   */
  async verifyNewUsername(username) {
    // Check username query
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username]
    }

    // Checking username from storage
    const result = await this.pool.query(query)

    return result.rowCount > 0
  }

  /**
   * Get details user from storage
   * 
   * @param {String} id
   * @returns {JSON} user
   */
  async getUserById(id) {
    // Get details user query
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id]
    }

    // Getting user details from storage
    const result = await this.pool.query(query)

    return result.rows[0]
  }
}

export default new UserRepositories()
