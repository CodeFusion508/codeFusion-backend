const Joi = require("joi");

module.exports = {
    GET_UUID: Joi.object({
        uuid: Joi.required()
    }),
    CREATE_EXMANS: Joi.object({
        content: Joi.array().items().required()
    }),
    UPDATE_EXMANS: Joi.object({
        uuid       : Joi.string().required(),
        element    : Joi.string().required(),
        content    : Joi.number().required(),
        leguaje    : Joi.string().required(),
        uuidSprint : Joi.string().required()
    }),
    VERIFY_CODE: Joi.object({
        uuidSprint  : Joi.string().required(),
        code        : Joi.string().required()
    })
};