const Joi = require("joi");

module.exports = {
    GET_UUID: Joi.object({
        uuid: Joi.required()
    }),
    CREATE_CONTENT: Joi.object({
        label   : Joi.string().required(),
        path    : Joi.string().required(),
        exp     : Joi.number().required(),
        title   : Joi.string().required(),
        dayUuid : Joi.string().required(),
        //link    : Joi.string().optional()
        desc    : Joi.string().required()
    }),
    UPDATE_CONTENT: Joi.object({
        uuid  : Joi.string().required(),
        desc  : Joi.string().optional(),
        path  : Joi.string().optional(),
        link  : Joi.string().optional(),
        exp   : Joi.number().optional(),
        title : Joi.string().optional(),
    })
};