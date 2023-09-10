const createContentQuery = (uuid, body) => {
    const query = `
        CREATE (c:Content:${body.label} {
            uuid  : "${uuid}",
            exp   : ${body.exp},
            title : "${body.title}",
            desc  : "${body.desc}",
            time  : "${body.time}",

            ${body.element ? `element : "${body.element}",` : ""}
            ${body.content ? `content : "${body.content}",` : ""}
            ${body.language ? `language : "${body.language}"` : ""}

            ${body.path ? `path : "${body.path}"` : ""}

            ${body.link ? `link : "${body.link}"` : ""}
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
    const propsToUpdate = [];

    // Common Properties
    if (body.exp) {
        propsToUpdate.push(`c.exp = ${body.exp}`);
    }
    if (body.title) {
        propsToUpdate.push(`c.title = "${body.title}"`);
    }
    if (body.desc) {
        propsToUpdate.push(`c.desc = "${body.desc}"`);
    }
    if (body.time) {
        propsToUpdate.push(`c.time = "${body.time}"`);
    }

    // Video
    if (body.link) {
        propsToUpdate.push(`c.link = "${body.link}"`);
    }

    // Text and Quiz
    if (body.path) {
        propsToUpdate.push(`c.path = "${body.path}"`);
    }

    // Problem
    if (body.element) {
        propsToUpdate.push(`c.element = "${body.element}"`);
    }
    if (body.content) {
        propsToUpdate.push(`c.content = "${body.content}"`);
    }
    if (body.language) {
        propsToUpdate.push(`c.language = "${body.language}"`);
    }

    const query = `
        MATCH (c:Content:${body.label} {uuid: "${body.uuid}"})
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
