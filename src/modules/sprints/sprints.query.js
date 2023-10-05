// Sprint CRUD
const createSprintQuery = (uuid, body) => {
    const query = `
        CREATE (s:Sprint {
            uuid     : $uuid,
            sprintNo : $sprintNo,
            title    : $title,
            desc     : $desc,
            totalExp : 0
        })
        RETURN s;
    `;

    const queryParams = {
        uuid,
        sprintNo : body.sprintNo,
        title    : body.title,
        desc     : body.desc
    };

    return { query, queryParams };
};


const getAllSprintsQuery = () => `
    MATCH (s:Sprint) 
    WHERE NOT s:softDeleted 
    RETURN s;
`;

const updateSprintQuery = (body) => {
    let propsToUpdate = [];
    const queryParams = { uuid: body.uuid };

    if (body.sprintNo) {
        propsToUpdate.push("s.sprintNo = $sprintNo");
        queryParams.sprintNo = body.sprintNo;
    }
    if (body.title) {
        propsToUpdate.push("s.title = $title");
        queryParams.title = body.title;
    }
    if (body.desc) {
        propsToUpdate.push("s.desc = $desc");
        queryParams.desc = body.desc;
    }
    if (body.totalExp) {
        propsToUpdate.push("s.totalExp = $totalExp");
        queryParams.totalExp = body.totalExp;
    }

    const query = `
        MATCH (s:Sprint {uuid: $uuid})
        WHERE NOT s:softDeleted
        SET ${propsToUpdate.join(", ")}
        RETURN s;
    `;

    return { query, queryParams };
};

const getSprintQuery = (params) => {
    const query = `
        MATCH (s:Sprint {uuid: $uuid}) 
        WHERE NOT s:softDeleted 
        RETURN s;
    `;

    const queryParams = { uuid: params.uuid };

    return { query, queryParams };
};

const deleteSprintQuery = (params) => {
    const query = `
        MATCH (s:Sprint {uuid: $uuid})
        SET s:softDeleted;
    `;

    const queryParams = { uuid: params.uuid };

    return { query, queryParams };
};

// Sprint Relationships
const getSprintsRelsQuery = (params) => {
    const query = `
        MATCH (d)-[r:BELONGS_TO]->(s:Sprint {uuid: $uuid})
        WHERE NOT s:softDeleted AND NOT d:softDeleted
        RETURN d, r;
    `;

    const queryParams = { uuid: params.uuid };

    return { query, queryParams };
};

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