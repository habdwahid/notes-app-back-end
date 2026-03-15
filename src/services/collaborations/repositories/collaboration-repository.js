import {nanoid} from 'nanoid'
import {Pool} from 'pg'

class CollaborationRepositories {
  constructor() {
    this.pool = new Pool()
  }

  /**
   * Add or insert a new collaboration into storage
   * 
   * @param {String} noteId
   * @param {String} userId
   * @returns {String} id
   */
  async createCollaboration(noteId, userId) {
    const id = nanoid(16)

    // Add collaboration query
    const query = {
      text: 'INSERT INTO collaborations(id, note_id, user_id) VALUES($1, $2, $3) RETURNING id',
      values: [id, noteId, userId]
    }

    // Adding collaboration into storage
    const result = await this.pool.query(query)

    return result.rows[0]
  }

  /**
   * Delete collaboration from storage
   * 
   * @param {String} noteId
   * @param {String} userId
   * @returns {String} id
   */
  async deleteCollaboration(noteId, userId) {
    // Delete collaboration query
    const query = {
      text: 'DELETE FROM collaborations WHERE note_id = $1 AND user_id = $2 RETURNING id',
      values: [noteId, userId]
    }

    // Deleting collaboration from storage
    const result = await this.pool.query(query)

    return result.rows[0]
  }

  /**
   * Verify collaborato from storage
   * 
   * @param {String} noteId
   * @param {String} userId
   */
  async verifyCollaborator(noteId, userId) {
    // Verify collaborator query
    const query = {
      text: 'SELECT * FROM collaborations WHERE note_id = $1 AND user_id = $2',
      values: [noteId, userId]
    }

    // Verifying collaborator from storage
    const result = await this.pool.query(query)

    return result.rows.length > 0
  }
}

export default new CollaborationRepositories()
