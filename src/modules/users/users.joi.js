const Joi = require("joi");

module.exports = {
    // Student CRUD
    GET_UUID: Joi.object({
        uuid: Joi.required(),
    }),
    CREATE_USER: Joi.object({
        userName : Joi.string().required(),
        email    : Joi.string().required(),
        password : Joi.string().required()
    }),
    LOGIN_USER: Joi.object({
        email    : Joi.string().required(),
        password : Joi.string().required()
    }),
    UPDATE_USER: Joi.object({
        uuid      : Joi.string().required(),
        totalExp  : Joi.number().optional(),
        weeklyExp : Joi.number().optional(),
        userName  : Joi.string().optional(),
        email     : Joi.string().optional(),
        password  : Joi.string().optional()
    }),
    // Relation Joi
    CREATE_RELATION: Joi.object({
        uuid        : Joi.string().required(),
        contentUuid : Joi.string().required(),
        op          : Joi.string().required(),
        relation    : Joi.string().required(),
        eval        : Joi.string().optional()
    }),
    DELETE_RELATION: Joi.object({
        uuid        : Joi.string().required(),
        contentUuid : Joi.string().required(),
        op          : Joi.string().required(),
        relation    : Joi.string().required()
    }),
    // Other Joi
    CREATE_G_USER: Joi.object({
        userName : Joi.string().required(),
        email    : Joi.string().required(),
        token    : Joi.string().required()
    }),
    LOGIN_G_USER: Joi.object({
        idtoken: Joi.string().required()
    }),
    CONFIRM_ACCOUNT: Joi.object({
        token: Joi.string().required()
    }),
    RECOVERY_ACCOUNT: Joi.object({
        email: Joi.string().required()
    })
};