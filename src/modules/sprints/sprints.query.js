const createSprintQuery = (uuid, body) => {
    const query = `
        CREATE (s: Sprint
            {
                uuid     : "${uuid}", 
                totalExp : 0,
                title    : "${body.title}",
                desc     : "${body.desc}"
            }
        )
        RETURN s;
    `;

    return query;
};

const getSprintQuery = (params) => {
    const query = `
        MATCH (s: Sprint {uuid: "${params.uuid}"}) 
        WHERE NOT s:softDeleted 
        RETURN s;
    `;

    return query;
};

const getAllSprintsQuery = () => {
    const query = `
        MATCH (s: Sprint) 
        WHERE NOT s:softDeleted 
        RETURN s;
    `;

    return query;
};

const getSprintsRelsQuery = (params) => {
    const query = `
        MATCH (s: Sprint {uuid: "${params.uuid}"})
        WHERE NOT s:softDeleted
        WITH s
        MATCH (d)-[r:BELONGS_TO]->(s)
        WHERE NOT d:softDeleted
        RETURN d, r;
    `;

    return query;
};

const deleteSprintQuery = (params) => `
    MATCH (s: Sprint {uuid: "${params.uuid}"})
    SET s:softDeleted;
`;

const updateSprintQuery = (body) => {
    let propsToUpdate = [];

    if (body.totalExp) {
        propsToUpdate.push(`s.totalExp = ${body.totalExp}`);
    }
    if (body.title) {
        propsToUpdate.push(`s.title = "${body.title}"`);
    }
    if (body.desc) {
        propsToUpdate.push(`s.desc = "${body.desc}"`);
    }
    if (body.path) {
        propsToUpdate.push(`s.path = "${body.path}"`);
    }

    const updateQuery = `
      MATCH (s: Sprint {uuid: "${body.uuid}"})
      WHERE NOT s:softDeleted
      SET ${propsToUpdate.join(", ")}
      RETURN s;
    `;

    return updateQuery;
};


module.exports = {
    createSprintQuery,
    getSprintQuery,
    deleteSprintQuery,
    updateSprintQuery,
    getAllSprintsQuery,
    getSprintsRelsQuery
};