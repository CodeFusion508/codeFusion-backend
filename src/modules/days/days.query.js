// Day CRUD
const createDayQuery = (uuid, body) => {
    const query = `
        CREATE (d:Day {
            uuid : "${uuid}",
            exp  : 0,
            desc : "${body.desc}"
        })
        WITH d
        MATCH (s:Sprint {uuid: "${body.sprintUuid}"})
        WHERE NOT s:softDeleted
        CREATE (d)-[:BELONGS_TO {dayNo: ${body.dayNo}}]->(s)
        RETURN d;
    `;

    return query;
};

const getAllDaysQuery = () => `
    MATCH (d:Day) 
    WHERE NOT d:softDeleted
    RETURN d;
`;

const updateDayQuery = (body) => {
    let propsToUpdate = [];

    if (body.exp) {
        propsToUpdate.push(`d.exp = ${body.exp}`);
    }
    if (body.desc) {
        propsToUpdate.push(`d.desc = "${body.desc}"`);
    }

    const query = `
        MATCH (d:Day {uuid: "${body.uuid}"})
        WHERE NOT d:softDeleted
        SET ${propsToUpdate.join(", ")}
        RETURN d;
    `;

    return query;
};

const getDayQuery = (params) => `
    MATCH (d: Day {uuid: "${params.uuid}"}) 
    WHERE NOT d:softDeleted 
    RETURN d;
`;


const deleteDayQuery = (params) => `
    MATCH (d: Day {uuid: "${params.uuid}"})
    SET d:softDeleted;
`;

// Day Relationships
const getDaysRelsQuery = (params) => `
    MATCH (c)-[r:BELONGS_TO]->(d:Day {uuid: "${params.uuid}"})
    WHERE NOT d:softDeleted AND NOT c:softDeleted
    RETURN c, r;
`;

module.exports = {
    createDayQuery,
    getAllDaysQuery,
    updateDayQuery,
    getDayQuery,
    deleteDayQuery,

    getDaysRelsQuery
};