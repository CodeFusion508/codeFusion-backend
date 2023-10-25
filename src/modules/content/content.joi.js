const Joi = require("joi");

const baseSchema = {
    label : Joi.string().valid("Problem", "Quiz", "Text", "Video").required(),
    exp   : Joi.number().required(),
    title : Joi.string().required(),
    desc  : Joi.string().required(),
    time  : Joi.string().required(),

    dayUuid   : Joi.string().uuid().required(),
    contentNo : Joi.number().required()
};
const baseUpdateSchema = {
    label : Joi.string().valid("Problem", "Quiz", "Text", "Video").required(),
    uuid  : Joi.string().uuid().required(),
    exp   : Joi.number().optional(),
    title : Joi.string().optional(),
    desc  : Joi.string().optional(),
    time  : Joi.string().optional()
};

const question = Joi.object({
    question : Joi.string().required(),
    answers  : Joi.object({
        a1 : Joi.string().required(),
        a2 : Joi.string().required(),
        a3 : Joi.string().required(),
        a4 : Joi.string().required()
    }).required(),
    correctAnswer: Joi.string().valid("a1", "a2", "a3", "a4").required()
}).required();

module.exports = {
    GET_UUID: Joi.object({
        uuid: Joi.required()
    }),
    CREATE_PROBLEM: Joi.object({
        ...baseSchema,

        language: Joi.string().required()
    }),
    CREATE_QUIZ: Joi.object({
        ...baseSchema,

        questions: Joi.object({
            q1  : question,
            q2  : question,
            q3  : question,
            q4  : question,
            q5  : question,
            q6  : question,
            q7  : question,
            q8  : question,
            q9  : question,
            q10 : question
        }).required()
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
        ...baseUpdateSchema,

        language: Joi.string().optional(),

        path: Joi.string().optional(),

        link: Joi.string().optional()
    }),


    // For controller verification
    UPDATE_PROBLEM: Joi.object({
        ...baseUpdateSchema,

        language: Joi.string().required()
    }),
    UPDATE_QUIZ: Joi.object({
        ...baseUpdateSchema,

        path: Joi.string().required()
    }),
    UPDATE_VIDEO: Joi.object({
        ...baseUpdateSchema,

        link: Joi.string().required()
    }),
    UPDATE_TEXT: Joi.object({
        ...baseUpdateSchema,

        path: Joi.string().required()
    })
};