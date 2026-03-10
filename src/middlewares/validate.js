const validate = (schema) => (req, res, next) => {
  const {error, value} = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  })

  // Check if error exist
  if (error) return next(error)

  req.validated = value
  next()
}

export default validate
