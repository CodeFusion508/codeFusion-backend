const Joi = require("joi");

module.exports = {
    GET_UUID: Joi.object({
        uuid: Joi.required()
    }),
    CREATE_SPRINT: Joi.object({
        sprintNo : Joi.string().required(),
        title    : Joi.string().required(),
        desc     : Joi.string().required()
    }),
    UPDATE_SPRINT: Joi.object({
        uuid     : Joi.string().required(),
        sprintNo : Joi.string().optional(),
        title    : Joi.string().optional(),
        desc     : Joi.string().optional(),
        totalExp : Joi.number().optional()
    })
};