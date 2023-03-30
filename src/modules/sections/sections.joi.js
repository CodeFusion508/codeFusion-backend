const Joi = require("joi");

module.exports = {
    GET_UUID: Joi.object({
        uuid: Joi.required()
    }),
    CREATE_SECTION: Joi.object({
        path  : Joi.string().required(),
        title : Joi.string().required(),
        desc  : Joi.string().required()
    }),
    UPDATE_SECTION: Joi.object({
        uuid     : Joi.string().required(),
        path     : Joi.string().optional(),
        title    : Joi.string().optional(),
        desc     : Joi.string().optional(),
        totalExp : Joi.number().optional()
    })
};