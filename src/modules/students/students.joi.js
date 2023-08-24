const Joi = require("joi");

module.exports = {
    // CRUD Joi
    GET_UUID: Joi.object({
        uuid: Joi.required(),
    }),
    CREATE_STUDENT: Joi.object({
        userName : Joi.string().required(),
        email    : Joi.string().email().required(),
        password : Joi.string().required()
    }),
    LOGIN_STUDENT: Joi.object({
        email    : Joi.string().email().required(),
        password : Joi.string().required()
    }),
    UPDATE_STUDENT: Joi.object({
        uuid      : Joi.string().uuid().required(),
        totalExp  : Joi.number().optional(),
        weeklyExp : Joi.number().optional(),
        userName  : Joi.string().optional(),
        email     : Joi.string().email().optional(),
        password  : Joi.string().optional()
    }),
    // Relation Joi
    CREATE_RELATION: Joi.object({
        uuid         : Joi.string().uuid().required(),
        contentUuid  : Joi.string().uuid().required(),
        contentLabel : Joi.string().valid("Problem", "Quiz", "Text", "Video").required(),
        relation     : Joi.string().valid("COMPLETED", "FAILED").required()
    }),
    DELETE_RELATION: Joi.object({
        uuid         : Joi.string().uuid().required(),
        contentUuid  : Joi.string().uuid().required(),
        contentLabel : Joi.string().valid("Problem", "Quiz", "Text", "Video").required(),
        relation     : Joi.string().valid("COMPLETED", "FAILED").required()
    }),
    // Other Joi
    CONFIRM_ACCOUNT: Joi.object({
        token: Joi.string().required()
    }),
    RECOVERY_ACCOUNT: Joi.object({
        email: Joi.string().email().required()
    })
};