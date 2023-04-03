const Joi = require("joi");

module.exports = {
    GET_UUID: Joi.object({
        uuid: Joi.required()
    }),
    CREATE_DAY: Joi.object({
        desc       : Joi.string().required(),
        dayNo      : Joi.number().required(),
        sprintUuid : Joi.string().required()
    }),
    UPDATE_DAY: Joi.object({
        uuid : Joi.string().required(),
        exp  : Joi.number().optional(),
        desc : Joi.string().optional(),
    })
};