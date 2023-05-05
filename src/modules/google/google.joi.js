const Joi = require("joi");

module.exports = {
    CREATE_G_USER: Joi.object({
        userName : Joi.string().required(),
        email    : Joi.string().required(),
        token    : Joi.string().required()
    }),
    LOGIN_G_USER: Joi.object({
        idtoken: Joi.string().required()
    }),
    GET_ALL_ANSWERS: Joi.object({
        sheet_id: Joi.string().required()
    }),
    GET_USER_ANSWERS: Joi.object({
        sheet_id : Joi.string().required(),
        email    : Joi.string().required()
    })
};