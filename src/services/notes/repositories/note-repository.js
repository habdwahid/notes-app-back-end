import {nanoid} from 'nanoid'
import {Pool} from 'pg'

class NoteRepositories {
  constructor() {
    this.pool = new Pool()
  }

  /**
   * Add or insert a new note into storage
   * 
   * @param {Object} note
   * @param {String} note.id
   * @param {String} note.body
   * @param {Array} note.tags
   * @param {String} note.owner
   * @returns {String} id
   */
  async createNote({title, body, tags, owner}) {
    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    // Query to insert into storage
    const query = {
      text: 'INSERT INTO notes(id, title, body, tags, created_at, updated_at, owner) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, body, tags, createdAt, updatedAt, owner]
    }

    // Inserting into storage
    const result = await this.pool.query(query)

    return result.rows[0]
  }

  /**
   * Get all notes from storage
   * 
   * @param {String} owner
   * @returns {JSON} notes
   */
  async getNotes(owner) {
    // Get notes query
    const query = {
      text: 'SELECT * FROM notes WHERE owner = $1',
      values: [owner]
    }

    // Getting all notes from storage
    const result = await this.pool.query(query)

    return result.rows
  }

  /**
   * Get note details from storage
   * 
   * @param {String} id
   * @returns {JSON} note
   */
  async getNoteById(id) {
    // Query to get note details
    const query = {
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [id]
    }

    // Get note details
    const result = await this.pool.query(query)

    return result.rows[0]
  }

  /**
   * Update note details from storage
   * 
   * @param {Object} note
   * @param {String} note.id
   * @param {String} note.title
   * @param {String} note.body
   * @param {Array} note.tags
   * @returns {String} id
   */
  async updateNoteById({id, title, body, tags}) {
    const updatedAt = new Date().toISOString()

    // Query to update note details
    const query = {
      text: 'UPDATE notes SET title = $2, body = $3, tags = $4, updated_at = $5 WHERE id = $1 RETURNING id',
      values: [id, title, body, tags, updatedAt]
    }

    // Updating note details from storage
    const result = await this.pool.query(query)

    return result.rows[0]
  }

  /**
   * Delete note details from storage
   * 
   * @param {String} id
   * @returns {String} id
   */
  async deleteNoteById(id) {
    // Query to delete note details
    const query = {
      text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
      values: [id]
    }

    // Deleting note details from storage
    const result = await this.pool.query(query)

    return result.rows[0]
  }

  /**
   * Verify note owner from storage
   * 
   * @param {String} id
   * @param {String} owner
   */
  async verifyNoteOwner(id, owner) {
    // Verify note owner query
    const query = {
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [id]
    }

    // Finding note by id from storage
    const result = await this.pool.query(query)

    // If note don't exist
    if (!result.rows.length) return null

    const note = result.rows[0]

    // If note owner and owner is not same
    if (note.owner !== owner) return null

    return result.rows[0]
  }
}

export default new NoteRepositories()
