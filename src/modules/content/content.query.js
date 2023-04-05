const createContentQuery = (uuid, body) => {
    const query = `
        CREATE (c: Content:${body.label}
            {
                uuid : "${uuid}", 
                path : "${body.path}",
                desc : "${body.desc}",
                exp  : ${body.exp},
                title: "${body.title}"
            }
        )
        WITH c
        MATCH(d: Day { uuid: "${body.dayUuid}" })
        WHERE NOT d:softDeleted
        CREATE (c)-[:BELONGS_TO]->(d)
        RETURN c;
    `;

    return query;
};

const getContentQuery = (params) => {
    const query = `
        MATCH (c: Content {uuid: "${params.uuid}"}) 
        WHERE NOT c:softDeleted 
        RETURN c;
    `;

    return query;
};

const deletedContentQuery = (params) => `
    MATCH (c: Content {uuid: "${params.uuid}"})
    SET c:softDeleted;
`;

const updatedContentQuery = (body) => {
    let propsToUpdate = [];

    if (body.path) {
        propsToUpdate.push(`c.path = "${body.path}"`);
    }
    /*if (body.link) {
        propsToUpdate.push(`c.desc = "${body.link}"`);
    }*/
    if (body.exp) {
        propsToUpdate.push(`c.exp = ${body.exp}`);
    }
    if (body.title) {
        propsToUpdate.push(`c.desc = "${body.title}"`);
    }
    if (body.desc) {
        propsToUpdate.push(`c.desc = "${body.desc}"`);
    }
    const query = `
      MATCH (c: Content {uuid: "${body.uuid}"})
      WHERE NOT c:softDeleted
      SET ${propsToUpdate.join(", ")}
      RETURN c;
    `;

    return query;
};

module.exports = {
    createContentQuery,
    getContentQuery,
    deletedContentQuery,
    updatedContentQuery
};