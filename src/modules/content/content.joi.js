const Joi = require("joi");

const baseSchema = {
    exp       : Joi.number().required(),
    title     : Joi.string().required(),
    desc      : Joi.string().required(),
    dayUuid   : Joi.string().required(),
    contentNo : Joi.number().required(),
    time      : Joi.number().required()
};

module.exports = {
    GET_UUID: Joi.object({
        uuid: Joi.required()
    }),
    CREATE_PROBLEM: Joi.object({
        ...baseSchema
    }),
    CREATE_QUIZ: Joi.object({
        ...baseSchema,
        path: Joi.string().required()
    }),
    CREATE_VIDEO: Joi.object({
        ...baseSchema,
        link: Joi.string().optional()
    }),
    CREATE_TEXT: Joi.object({
        ...baseSchema,
        path: Joi.string().required()
    }),
    UPDATE_CONTENT: Joi.object({
        uuid  : Joi.string().required(),
        desc  : Joi.string().optional(),
        path  : Joi.string().optional(),
        exp   : Joi.number().optional(),
        title : Joi.string().optional(),
        time  : Joi.number().optional(),
        link  : Joi.string().optional()
    })
};