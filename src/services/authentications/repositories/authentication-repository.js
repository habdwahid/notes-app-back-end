import {Pool} from 'pg'

class AuthenticationRepositories {
  constructor() {
    this.pool = new Pool()
  }

  /**
   * Add or insert a new refresh token into storage
   * 
   * @param {String} token
   */
  async createRefreshToken(token) {
    // Insert refresh token query
    const query = {
      text: 'INSERT INTO authentications(token) VALUES($1)',
      values: [token]
    }

    // Inserting refresh token into storage
    await this.pool.query(query)
  }

  /**
   * Delete refresh token from storage
   * 
   * @param {String} token
   */
  async deleteRefreshToken(token) {
    // Delete refresh token query
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token]
    }

    // Deleting refresh token from storage
    await this.pool.query(query)
  }

  /**
   * Verify refresh token from storage
   * 
   * @param {String} token
   */
  async verifyRefreshToken(token) {
    // Verify refresh token query
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token]
    }

    // Verifying refresh token from storage
    const result = await this.pool.query(query)

    // Check if refresh token is not found
    if (!result.rows.length) return false

    return result.rows[0]
  }
}

export default new AuthenticationRepositories()
