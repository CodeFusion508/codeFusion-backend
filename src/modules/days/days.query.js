// Day CRUD
const createDayQuery = (uuid, body) => {
    const query = `
        CREATE (d:Day {
            uuid : $uuid,
            exp  : 0,
            desc : $desc
        })
        WITH d
        MATCH (s:Sprint {uuid: $sprintUuid})
        WHERE NOT s:softDeleted
        CREATE (d)-[:BELONGS_TO {dayNo: $dayNo}]->(s)
        RETURN d;
    `;

    const queryParams = {
        uuid       : uuid,
        desc       : body.desc,
        sprintUuid : body.sprintUuid,
        dayNo      : body.dayNo
    };

    return { query, queryParams };
};

const updateDayQuery = (body) => {
    const propsToUpdate = [];
    const queryParams = { uuid: body.uuid };

    if (body.exp) {
        propsToUpdate.push("d.exp = $exp");
        queryParams.exp = body.exp;
    }
    if (body.desc) {
        propsToUpdate.push("d.desc = $desc");
        queryParams.desc = body.desc;
    }

    const query = `
        MATCH (d:Day {uuid: $uuid})
        WHERE NOT d:softDeleted
        SET ${propsToUpdate.join(", ")}
        RETURN d;
    `;

    return { query, queryParams };
};

const getDayQuery = (params) => {
    const query = `
        MATCH (d:Day {uuid: $uuid}) 
        WHERE NOT d:softDeleted 
        RETURN d;
    `;

    const queryParams = { uuid: params.uuid };

    return { query, queryParams };
};

const deleteDayQuery = (params) => {
    const query = `
        MATCH (d:Day {uuid: $uuid})
        SET d:softDeleted;
    `;

    const queryParams = { uuid: params.uuid };

    return { query, queryParams };
};

// Day Relationships
const getDaysRelsQuery = (params) => {
    const query = `
        MATCH (c:Content)-[r:BELONGS_TO]->(d:Day {uuid: $uuid})
        WHERE NOT d:softDeleted AND NOT c:softDeleted
        RETURN c, r;
    `;

    const queryParams = { uuid: params.uuid };

    return { query, queryParams };
};

// Delete Test Data
const deleteTestRels = () => `
    MATCH (c)-[r:BELONGS_TO]->(d:Day)
    WHERE d.desc STARTS WITH "Test -"
    DELETE r;
`;

const deleteTestDaysQuery = () => `
    MATCH (d:Day)
    WHERE d.desc STARTS WITH "Test -"
    DELETE d;
`;

module.exports = {
    createDayQuery,
    updateDayQuery,
    getDayQuery,
    deleteDayQuery,

    getDaysRelsQuery,

    deleteTestRels,
    deleteTestDaysQuery
};