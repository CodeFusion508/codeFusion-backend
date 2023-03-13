const Joi = require("joi");

module.exports = {
    getUUID: Joi.object({
        uuid: Joi.required()
    }),
    createUSER: Joi.object({
        userName : Joi.string().required(),
        email    : Joi.string().required(),
        password : Joi.string().required()
    }),
    updateUSER: Joi.object({
        uuid      : Joi.string().required(),
        totalExp  : Joi.number().optional(),
        weeklyExp : Joi.number().optional(),
        userName  : Joi.string().optional(),
        email     : Joi.string().optional(),
        password  : Joi.string().optional()
    })
};