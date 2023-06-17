const Joi = require("joi");

module.exports = {
    // CRUD Joi
    GET_UUID: Joi.object({
        uuid: Joi.required(),
    }),
    CREATE_STUDENT: Joi.object({
        userName : Joi.string().required(),
        email    : Joi.string().required(),
        password : Joi.string().required()
    }),
    LOGIN_STUDENT: Joi.object({
        email    : Joi.string().required(),
        password : Joi.string().required()
    }),
    UPDATE_STUDENT: Joi.object({
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
    CONFIRM_ACCOUNT: Joi.object({
        token: Joi.string().required()
    }),
    RECOVERY_ACCOUNT: Joi.object({
        email: Joi.string().required()
    })
};