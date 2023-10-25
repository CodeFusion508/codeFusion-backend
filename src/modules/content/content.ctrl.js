const { v4 } = require("uuid");
const ivm = require("isolated-vm");

const code = `++count;`;
// setting rules for a new vm process
const isolate = new ivm.Isolate({ memoryLimit: 50 /* MB */ });
// probable parses the code to actually run it later
const script = isolate.compileScriptSync(code);

// Like the name implies this keeps the context of the code, almost like a mini vm instance
// This would be really cool to provide more customization of testing of our code
const context = isolate.createContextSync();
// The "context code" before the actual code actually runs
context.evalSync("let count = 0;");

// script.runSync(context); actually executes the code and we get back the results
console.log(script.runSync(context)); // Prints "1"
console.log(script.runSync(context)); // Prints "2"

const { cleanNeo4j, cleanRecord } = require("../../utils/cleanData.js");
const {
    createContentQuery,
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
    updateContent,
    getContent,
    deleteContent,

    bulkTestDelete
});


// Helper Functions
const contentUpdateVerification = async (bodyAndParam) => {
    if (Object.keys(bodyAndParam).length < 3) throw { err: 400, message: "Debe indicar al menos un cambio." };

    switch (bodyAndParam.label) {
        case "Problem": {
            const { error, value } = UPDATE_PROBLEM.validate(bodyAndParam);
            if (error) throw new Error(`${error.message}`);

            return value;
        }

        case "Quiz": {
            const { error, value } = UPDATE_QUIZ.validate(bodyAndParam);
            if (error) throw new Error(`${error.message}`);

            return value;
        }

        case "Text": {
            const { error, value } = UPDATE_TEXT.validate(bodyAndParam);
            if (error) throw new Error(`${error.message}`);

            return value;
        }

        case "Video": {
            const { error, value } = UPDATE_VIDEO.validate(bodyAndParam);
            if (error) throw new Error(`${error.message}`);

            return value;
        }

        default:
            throw { err: 400, message: "No tiene el label correcto." };
    }
};