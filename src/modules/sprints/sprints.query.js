// Sprint CRUD
const createSprintQuery = (uuid, body) => {
    const query = `
        CREATE (s:Sprint {
            uuid     : "${uuid}",
            sprintNo : ${body.sprintNo},
            title    : "${body.title}",
            desc     : "${body.desc}",
            totalExp : 0
        })
        RETURN s;
    `;

    return query;
};


const getAllSprintsQuery = () => `
    MATCH (s:Sprint) 
    WHERE NOT s:softDeleted 
    RETURN s;
`;

const updateSprintQuery = (body) => {
    let propsToUpdate = [];

    if (body.sprintNo) {
        propsToUpdate.push(`s.sprintNo = ${body.sprintNo}`);
    }
    if (body.title) {
        propsToUpdate.push(`s.title = "${body.title}"`);
    }
    if (body.desc) {
        propsToUpdate.push(`s.desc = "${body.desc}"`);
    }
    if (body.totalExp) {
        propsToUpdate.push(`s.totalExp = ${body.totalExp}`);
    }

    const updateQuery = `
        MATCH (s:Sprint {uuid: "${body.uuid}"})
        WHERE NOT s:softDeleted
        SET ${propsToUpdate.join(", ")}
        RETURN s;
    `;

    return updateQuery;
};

const getSprintQuery = (params) => `
    MATCH (s:Sprint {uuid: "${params.uuid}"}) 
    WHERE NOT s:softDeleted 
    RETURN s;
`;

const deleteSprintQuery = (params) => `
    MATCH (s:Sprint {uuid: "${params.uuid}"})
    SET s:softDeleted;
`;

// Sprint Relationships
const getSprintsRelsQuery = (params) => `
    MATCH (d)-[r:BELONGS_TO]->(s:Sprint {uuid: "${params.uuid}"})
    WHERE NOT s:softDeleted AND NOT d:softDeleted
    RETURN d, r;
`;

// Delete Test Data
const deleteTestRels = () => `
    MATCH (d)-[r:BELONGS_TO]->(s:Sprint)
    WHERE s.title STARTS WITH "Test -"
    DELETE r;
`;

const deleteTestSprints = () => `
    MATCH (s:Sprint) 
    WHERE s.title STARTS WITH "Test -"
    DELETE s;
`;

module.exports = {
    createSprintQuery,
    getAllSprintsQuery,
    updateSprintQuery,
    getSprintQuery,
    deleteSprintQuery,

    getSprintsRelsQuery,

    deleteTestRels,
    deleteTestSprints
};