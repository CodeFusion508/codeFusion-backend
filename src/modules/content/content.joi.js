const Joi = require("joi");

const baseSchema = {
    label : Joi.string().valid("Problem", "Quiz", "Text", "Video").required(),
    exp   : Joi.number().required(),
    title : Joi.string().required(),
    desc  : Joi.string().required(),
    time  : Joi.number().required(),

    dayUuid   : Joi.string().required(),
    contentNo : Joi.number().required(),
};

module.exports = {
    GET_UUID: Joi.object({
        uuid: Joi.required()
    }),
    CREATE_PROBLEM: Joi.object({
        ...baseSchema,
        element  : Joi.string().required(),
        content  : Joi.string().required(),
        language : Joi.string().required()
    }),
    CREATE_QUIZ: Joi.object({
        ...baseSchema,
        path: Joi.string().required()
    }),
    CREATE_VIDEO: Joi.object({
        ...baseSchema,
        link: Joi.string().required()
    }),
    CREATE_TEXT: Joi.object({
        ...baseSchema,
        path: Joi.string().required()
    }),
    UPDATE_CONTENT: Joi.object({
        label : Joi.string().valid("Problem", "Quiz", "Text", "Video").required(),
        uuid  : Joi.string().required(),
        exp   : Joi.number().optional(),
        title : Joi.string().optional(),
        desc  : Joi.string().optional(),
        time  : Joi.number().optional(),

        // Problem
        element  : Joi.string().optional(),
        content  : Joi.string().optional(),
        language : Joi.string().optional(),

        // Quiz and Text
        path: Joi.string().optional(),

        // Video
        link: Joi.string().optional()
    }),


    UPDATE_PROBLEM: Joi.object({
        label : Joi.string().valid("Problem", "Quiz", "Text", "Video").required(),
        uuid  : Joi.string().required(),
        exp   : Joi.number().optional(),
        title : Joi.string().optional(),
        desc  : Joi.string().optional(),
        time  : Joi.number().optional(),

        element  : Joi.string().optional(),
        content  : Joi.string().optional(),
        language : Joi.string().optional()
    }),
    UPDATE_QUIZ: Joi.object({
        label : Joi.string().valid("Problem", "Quiz", "Text", "Video").required(),
        uuid  : Joi.string().required(),
        exp   : Joi.number().optional(),
        title : Joi.string().optional(),
        desc  : Joi.string().optional(),
        time  : Joi.number().optional(),

        path: Joi.string().optional()
    }),
    UPDATE_VIDEO: Joi.object({
        label : Joi.string().valid("Problem", "Quiz", "Text", "Video").required(),
        uuid  : Joi.string().required(),
        exp   : Joi.number().optional(),
        title : Joi.string().optional(),
        desc  : Joi.string().optional(),
        time  : Joi.number().optional(),

        link: Joi.string().optional()
    }),
    UPDATE_TEXT: Joi.object({
        label : Joi.string().valid("Problem", "Quiz", "Text", "Video").required(),
        uuid  : Joi.string().required(),
        exp   : Joi.number().optional(),
        title : Joi.string().optional(),
        desc  : Joi.string().optional(),
        time  : Joi.number().optional(),

        path: Joi.string().optional()
    })
};