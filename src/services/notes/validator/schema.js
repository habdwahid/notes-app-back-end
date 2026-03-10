import Joi from 'joi'

const notePayloadSchema = Joi.object({
  title: Joi.string().required().max(50),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required()
})

export default notePayloadSchema
