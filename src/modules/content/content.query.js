const createContentQuery = (uuid, body) => {
    const query = `
        CREATE (c:Content:${body.label} {
            uuid  : "${uuid}",
            exp   : ${body.exp},
            title : "${body.title}",
            desc  : "${body.desc}",
            time  : ${body.time},

            ${body.path ? `path  : "${body.path}",` : ""}
            ${body.link ? `link  : "${body.link}",` : ""}
        })
        WITH c
        MATCH (d:Day {uuid: "${body.dayUuid}"})
        WHERE NOT d:softDeleted
        CREATE (c)-[:BELONGS_TO {contentNo: ${body.contentNo}}]->(d)
        RETURN c;
    `;

    return query;
};

const updatedContentQuery = (body) => {
    let propsToUpdate = [];

    if (body.path) {
        propsToUpdate.push(`c.path = "${body.path}"`);
    }
    if (body.exp) {
        propsToUpdate.push(`c.exp = ${body.exp}`);
    }
    if (body.title) {
        propsToUpdate.push(`c.desc = "${body.title}"`);
    }
    if (body.desc) {
        propsToUpdate.push(`c.desc = "${body.desc}"`);
    }
    if (body.link) {
        propsToUpdate.push(`c.link = "${body.link}"`);
    }
    if (body.time) {
        propsToUpdate.push(`c.time = ${body.time}`);
    }

    const query = `
        MATCH (c:Content {uuid: "${body.uuid}"})
        WHERE NOT c:softDeleted
        SET ${propsToUpdate.join(", ")}
        RETURN c;
    `;

    return query;
};

const getContentQuery = (params) => `
    MATCH (c:Content {uuid: "${params.uuid}"}) 
    WHERE NOT c:softDeleted 
    RETURN c;
`;

const deletedContentQuery = (params) => `
    MATCH (c:Content {uuid: "${params.uuid}"})
    SET c:softDeleted;
`;

module.exports = {
    createContentQuery,
    updatedContentQuery,
    getContentQuery,
    deletedContentQuery
};