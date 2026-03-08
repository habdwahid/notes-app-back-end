const response = (res, statusCode, message, data = null) => {
  let status = ''

  if (statusCode < 400) {
    status = 'success'
  } else if (statusCode < 500) {
    status = 'fail'
  } else {
    status = 'error'
  }

  return res
    .status(statusCode)
    .json({
      status,
      message,
      data
    })
    .end()
}

export default response
