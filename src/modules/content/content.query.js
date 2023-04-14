const createContentQuery = (uuid, body) => {
    if (!body.link) {
        const query = `
            CREATE (c: Content:${body.label}
                {
                    uuid  : "${uuid}", 
                    path  : "${body.path}",
                    desc  : "${body.desc}",
                    exp   : ${body.exp},
                    title : "${body.title}",
                    time: ${body.time}
                }
            )
            WITH c
            CREATE (c)-[:BELONGS_TO {contentNo: ${body.contentNo}}]->(d:Day { uuid: "${body.dayUuid}" })
            WHERE NOT d:softDeleted
            RETURN c;
        `;

        return query;
    }

    const query = `
        CREATE (c:Content:${body.label}
            {
                uuid  : "${uuid}", 
                path  : "${body.path}",
                desc  : "${body.desc}",
                exp   : ${body.exp},
                title : "${body.title}",
                link  : "${body.link}",
                time: ${body.time}
            }
        )
        WITH c
        CREATE (c)-[:BELONGS_TO {contentNo: ${body.contentNo}}]->(d:Day { uuid: "${body.dayUuid}" })
        WHERE NOT d:softDeleted
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

const getContentQuery = (params) => {
    const query = `
        MATCH (c:Content {uuid: "${params.uuid}"}) 
        WHERE NOT c:softDeleted 
        RETURN c;
    `;

    return query;
};

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