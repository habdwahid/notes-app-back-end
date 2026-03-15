import {AuthorizationError, InvariantError} from '../../../exceptions/index.js'
import response from '../../../utils/response.js'
import NoteRepositories from '../../notes/repositories/note-repository.js'
import CollaborationRepositories from '../repositories/collaboration-repository.js'

/**
 * Add or insert a new collaboration
 * 
 * @returns {JSON} response
 */
const createCollaboration = async (req, res, next) => {
  const {id: credentialId} = req.user
  const {noteId, userId} = req.validated

  const isOwner = await NoteRepositories.verifyNoteOwner(noteId, credentialId)

  // Check if not the owner
  if (!isOwner) return next(new AuthorizationError('Anda tidak berhak mengakses resources ini'))

  const collaboration = await CollaborationRepositories.createCollaboration(noteId, userId)

  // Check if collaboration failed to create
  if (!collaboration) return next(new InvariantError('Kolaborasi gagal ditambahkan'))

  // Otherwise return success
  return response(res, 201, 'Kolaborasi berhasil ditambahkan', {collaborationId: collaboration.id})
}

/**
 * Delete collaboration
 * 
 * @returns {JSON} response
 */
const deleteCollaboration = async (req, res, next) => {
  const {noteId, userId} = req.validated
  const {id: credentialId} = req.user

  const isOwner = await NoteRepositories.verifyNoteOwner(noteId, credentialId)

  // Check if not the owner
  if (!isOwner) return next(new AuthorizationError('Anda tidak berhak mengakses resources ini'))

  // Deleting collaboration
  await CollaborationRepositories.deleteCollaboration(noteId, userId)

  return response(res, 200, 'Kolaborasi berhasil dihapus')
}

export {createCollaboration, deleteCollaboration}
