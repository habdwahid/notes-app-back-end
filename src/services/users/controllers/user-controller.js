import InvariantError, {NotFoundError} from '../../../exceptions/index.js'
import response from '../../../utils/response.js'
import UserRepositories from '../repositories/user-repository.js'

/**
 * Add or insert a new user into storage
 * 
 * @returns {JSON} response
 */
const createUser = async (req, res, next) => {
  const {username, password, fullname} = req.validated

  const isUsernameExist = await UserRepositories.verifyNewUsername(username)
  
  // Check if username are already used
  if (isUsernameExist) return next(new InvariantError('Gagal menambahkan user. Username sudah digunakan'))

  const user = await UserRepositories.createUser({username, password, fullname})

  // Check if user failed to create
  if (!user) return next(new InvariantError('Gagal menambahkan user'))

  // Otherwise return success
  return response(res, 201, 'User berhasil ditambahkan', {users: user.id})
}

/**
 * Get user details from storage
 * 
 * @returns {JSON} response
 */
const getUserById = async (req, res, next) => {
  const {id} = req.params
  const user = await UserRepositories.getUserById(id)

  // Check if user not found
  if (!user) return next(new NotFoundError('User tidak ditemukan'))

  // Otherwise return success
  return response(res, 200, 'User sukses ditampilkan', {user})
}

export {createUser, getUserById}
