const Joi = require("joi");

module.exports = {
    AUTH_G_USER: Joi.object({
        userName : Joi.string().required(),
        email    : Joi.string().email().required(),
        idToken  : Joi.string().required()
    }),
    GET_ALL_ANSWERS: Joi.object({
        sheet_id: Joi.string().required()
    }),
    GET_USER_ANSWERS: Joi.object({
        sheet_id : Joi.string().required(),
        email    : Joi.string().email().required()
    })
};