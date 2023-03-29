const Joi = require("joi");

module.exports = {
    getUUID: Joi.object({
        uuid: Joi.required()
    }),
    createSprint: Joi.object({
        totalExp  : Joi.string().required(),
        path : Joi.string().required(),
        title  : Joi.string().required(),
        desc  : Joi.string().required()
    }),
    updateSprint: Joi.object({
        uuid     : Joi.string().required(),
        totalExp     : Joi.string().optional(),
        title    : Joi.string().optional(),
        desc     : Joi.string().optional(),
        path : Joi.number().optional()
    }),
    deleteSprint: Joi.object({
        uuid     : Joi.string().required(),
    })
}