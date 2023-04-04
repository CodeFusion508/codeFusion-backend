const Joi = require("joi");

module.exports = {

    GET_UUID: Joi.object({
        uuid: Joi.required()
    }),
    CREATE_CONTENT_DAY: Joi.object({
        path  : Joi.string().required(),
        link  : Joi.string().optional(),
        exp   : Joi.number().required(),
        title : Joi.string().required(),
        label : Joi.string().required()
    }),
    UPDATE_CONTENT_DAY: Joi.object({
        uuid  : Joi.string().required(),
        path  : Joi.string().optional(),
        link  : Joi.string().optional(),
        exp   : Joi.number().optional(),
        title : Joi.string().optional(),
    })
};