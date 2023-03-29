const Joi = require("joi");

module.exports = {
    getUUID: Joi.object({
        uuid: Joi.required()
    }),
    createSECTION: Joi.object({
        path  : Joi.string().required(),
        title : Joi.string().required(),
        desc  : Joi.string().required()
    }),
    getSECTIONS: Joi.object({
        //
    }),
    updateSECTION: Joi.object({
        uuid     : Joi.string().required(),
        path     : Joi.string().optional(),
        title    : Joi.string().optional(),
        desc     : Joi.string().optional(),
        totalExp : Joi.number().optional()
    })
}