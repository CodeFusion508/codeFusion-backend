const createdContentDays = (uuid, body) => {
    const query = `
        CREATE (c: content:${body.label}
            {
                uuid: "${uuid}", 
                path: "${body.path}",
                link: "${body.link}",
                exp: 0,
                title: "${body.title}"
            }
        )
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
        propsToUpdate.push(`d.exp = ${body.path}`);
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
    `

    return updateQuery;
};


module.exports = { createdContentDays, getContentDaysQuery, deletedContentDays, updatedContentDays }