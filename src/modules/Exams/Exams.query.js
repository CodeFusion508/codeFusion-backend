const createdQuery = (uuid, body) => {
    const query = `
        CREATE (d:Exams {
            uuid      : "${uuid}",
            element   : "${body.element}",
            content   : "${body.content}",
            language   : "${body.language}",
            uuidSprint: "${body.uuidSprint}"
        })
        RETURN d;
    `;

    return query;
};

const getAllBySprint = (params) => `
    MATCH (d: Exams {uuidSprint: "${params.uuid}"}) 
    WHERE NOT d:softDeleted 
    RETURN d;
`;

const getByUuid = (params) => `
    MATCH (d: Exams {uuid: "${params.uuid}"}) 
    WHERE NOT d:softDeleted 
    RETURN d;
`;

const deleteByIdQuery = (params) => `
    MATCH (d: Exams {uuid: "${params.uuid}"})
    SET d:softDeleted;
`;

module.exports = {
    createdQuery,
    getByUuid,
    deleteByIdQuery,
    getAllBySprint
};