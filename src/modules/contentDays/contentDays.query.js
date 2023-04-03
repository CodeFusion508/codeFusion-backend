const createdContentDays = (uuid, body) => {
    const query = `
        CREATE (c: content:${body.label}
            {
                uuid : "${uuid}", 
                path : "${body.path}",
                link : "${body.hasOwnProperty('link') ? body.link:""}",
                exp  : 0,
                title: "${body.title}",
                label: "${body.label}"
            }
        )
        WITH c
        MATCH(d:Day { uuid: "${body.dayUuid}" })
        WHERE NOT c:sotfDeleted
        CREATE (c)-[:BELONGS_TO]->(d)
        RETURN c;
    `;

    return query;
};

const getContentDaysQuery = (params) => {
    const query = `
        MATCH (d: content {uuid: "${params.uuid}"}) 
        WHERE NOT d:softDeleted 
        RETURN d;
    `;

    return query;
};

const deletedContentDays = (params) => `
    MATCH (d: content {uuid: "${params.uuid}"})
    SET d:softDeleted;
`;

const updatedContentDays = (body) => {
    let propsToUpdate = [];

    if (body.path) {
        propsToUpdate.push(`d.path = "${body.path}"`);
    }
    if (body.link) {
        propsToUpdate.push(`d.desc = "${body.link}"`);
    }
    if (body.exp) {
        propsToUpdate.push(`d.exp = ${body.exp}`);
    }
    if (body.title) {
        propsToUpdate.push(`d.desc = "${body.title}"`);
    }

    const updateQuery = `
      MATCH (d: content {uuid: "${body.uuid}"})
      WHERE NOT d:softDeleted
      SET ${propsToUpdate.join(", ")}
      RETURN d;
    `;

    return updateQuery;
};

const getContentDaysRelationsQuery = (params) => {
    const query = `
        MATCH (c: content {uuid: "${params.uuid}"})
        WHERE NOT c:softDeleted
        WITH c
        MATCH (c)-[r:BELONGS_TO]->(d)
        WHERE NOT d:softDeleted
        RETURN d, r
    `;

    return query;
};


module.exports = { createdContentDays, getContentDaysQuery, deletedContentDays, updatedContentDays, getContentDaysRelationsQuery };