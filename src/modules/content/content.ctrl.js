const { v4 } = require("uuid");

const { cleanNeo4j, cleanRecord } = require("../../utils/cleanData.js");
const {
    createContentQuery,
    createQuestionQuery,
    createAnswerQuery,
    updatedContentQuery,
    getContentQuery,
    deletedContentQuery,

    deleteTestContentQuery
} = require("./content.query.js");
const {
    UPDATE_PROBLEM,
    UPDATE_QUIZ,
    UPDATE_VIDEO,
    UPDATE_TEXT
} = require("./content.joi.js");


module.exports = (deps) => Object.entries(module.exports).reduce((acc, [name, method]) => ({
    ...acc,
    [name]: method.bind(null, { ...module.exports, ...deps })
}), {});


// Content CRUD
const createContent = async ({ services }, body) => {
    const uuid = v4();
    const { query, queryParams } = createContentQuery(uuid, body);

    let data = await services.neo4j.session.run(query, queryParams);
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const createQuiz = async ({ services }, body) => {
    const result = await createContent({ services }, body)
        .catch((err) => { console.log(err, "<----------------------------- line 42"); });
    const contentUuid = result.node.uuid;

    for (const questionKey in body.questions) {
        const questionUuid = await createQuestion(services, contentUuid, body.questions[questionKey])
            .catch((err) => { console.log(err, "<----------------------------- line 47"); });

        for (const answerKey in body.questions[questionKey].answers) {
            await createAnswer(services, questionUuid, body.questions[questionKey].answers[answerKey])
            .catch((err) => { console.log(err, "<----------------------------- line 51"); });

        }
    }

    return result;
};

const updateContent = async ({ services }, bodyAndParam) => {
    const cleanData = await contentUpdateVerification(bodyAndParam);

    const { query, queryParams } = updatedContentQuery(cleanData);

    let data = await services.neo4j.session.run(query, queryParams);

    if (data.records.length === 0) throw { err: 404, message: "Este contenido no existe, verifique si tiene un uuid válido." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const getContent = async ({ services }, params) => {
    const { query, queryParams } = getContentQuery(params);

    let data = await services.neo4j.session.run(query, queryParams);

    if (data.records.length === 0) throw { err: 404, message: "Este contenido no existe, verifique si tiene un uuid válido." };

    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
};

const deleteContent = async ({ services }, params) => {
    const { query, queryParams } = deletedContentQuery(params);

    let data = await services.neo4j.session.run(query, queryParams);
    data = cleanNeo4j(data);

    return data;
};

// Delete Test Data
const bulkTestDelete = async ({ services }) => {
    const query = deleteTestContentQuery();

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);

    return data;
};


Object.assign(module.exports, {
    createContent,
    createQuiz,
    updateContent,
    getContent,
    deleteContent,

    bulkTestDelete
});


// Helper Functions
const contentUpdateVerification = async (bodyAndParam) => {
    if (Object.keys(bodyAndParam).length < 3) throw { err: 400, message: "Debe indicar al menos un cambio." };

    switch (bodyAndParam.label) {
        case "Problem":
            return await UPDATE_PROBLEM.validate(bodyAndParam).value;

        case "Quiz":
            return await UPDATE_QUIZ.validate(bodyAndParam).value;

        case "Text":
            return await UPDATE_TEXT.validate(bodyAndParam).value;

        case "Video":
            return await UPDATE_VIDEO.validate(bodyAndParam).value;

        default:
            throw { err: 400, message: "No tiene el label correcto." };
    }
};

const createQuestion = async ({ neo4j }, contentUuid, questionBody) => {
    const uuid = v4();
    const { query, queryParams } = createQuestionQuery(uuid, contentUuid, questionBody);

    let data = await neo4j.session.run(query, queryParams);
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data.node.uuid;
};

const createAnswer = async ({ neo4j }, questionUuid, answerBody) => {
    const uuid = v4();
    const { query, queryParams } = createAnswerQuery(uuid, questionUuid, answerBody);

    let data = await neo4j.session.run(query, queryParams);
    data = cleanNeo4j(data);
    cleanRecord(data);
};