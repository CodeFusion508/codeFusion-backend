const createContentQuery = (uuid, body) => {
    const query = `
        CREATE (c:Content:${body.label} {
            uuid  : $uuid,
            exp   : $exp,
            title : $title,
            desc  : $desc,
            time  : $time,

            ${body.language ? "language : $language" : ""}
            ${body.path ? "path : $path" : ""}
            ${body.link ? "link : $link" : ""}
        })
        WITH c
        MATCH (d:Day {uuid: $dayUuid})
        WHERE NOT d:softDeleted
        CREATE (c)-[:BELONGS_TO {contentNo: $contentNo}]->(d)
        RETURN c;
    `;

    const queryParams = {
        uuid,
        exp       : body.exp,
        title     : body.title,
        desc      : body.desc,
        time      : body.time,
        dayUuid   : body.dayUuid,
        contentNo : body.contentNo
    };
    if (body.language) queryParams.language = body.language;
    if (body.path) queryParams.path = body.path;
    if (body.link) queryParams.link = body.link;

    return { query, queryParams };
};

const updatedContentQuery = (body) => {
    const propsToUpdate = [];
    const queryParams = { uuid: body.uuid };

    // Common Properties
    if (body.exp) {
        propsToUpdate.push("c.exp = $exp");
        queryParams.exp = body.exp;
    }
    if (body.title) {
        propsToUpdate.push("c.title = $title");
        queryParams.title = body.title;
    }
    if (body.desc) {
        propsToUpdate.push("c.desc = $desc");
        queryParams.desc = body.desc;
    }
    if (body.time) {
        propsToUpdate.push("c.time = $time");
        queryParams.time = body.time;
    }

    if (body.link) {
        propsToUpdate.push("c.link = $link");
        queryParams.link = body.link;
    }
    if (body.path) {
        propsToUpdate.push("c.path = $path");
        queryParams.path = body.path;
    }
    if (body.language) {
        propsToUpdate.push("c.language = $language");
        queryParams.language = body.language;
    }

    const query = `
        MATCH (c:Content:${body.label} {uuid: $uuid})
        WHERE NOT c:softDeleted
        SET ${propsToUpdate.join(", ")}
        RETURN c;
    `;

    return { query, queryParams };
};

const getContentQuery = (params) => {
    const query = `
        MATCH (c:Content {uuid: $uuid}) 
        WHERE NOT c:softDeleted 
        RETURN c;
    `;

    const queryParams = { uuid: params.uuid };

    return { query, queryParams };
};

const deletedContentQuery = (params) => {
    const query = `
        MATCH (c:Content {uuid: $uuid})
        SET c:softDeleted;
    `;

    const queryParams = { uuid: params.uuid };

    return { query, queryParams };
};

// Delete Test Data
const deleteTestContentQuery = () => `
    MATCH (c:Content) 
    WHERE c.title STARTS WITH "Test -"
    DELETE c;
`;


module.exports = {
    createContentQuery,
    updatedContentQuery,
    getContentQuery,
    deletedContentQuery,

    deleteTestContentQuery
};
