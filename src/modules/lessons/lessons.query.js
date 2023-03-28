const createLessonQuery = (uuid, body) => {
    const query = `
        CREATE (s: Section
            {
                uuid: "${uuid}", 
                totalExp: 0,
                path: "${body.path}",
                title: "${body.title}",
                desc: "${body.desc}"
            }
        )
        RETURN s;
    `;

    return query;
};

const getLessonsQuery = () => {
    const query = `
        MATCH (s: Section) 
        WHERE NOT s:softDeleted 
        RETURN s;
    `;

    return query;
};

const findLessonQuery = (params) => `
    MATCH (s: Section {uuid: "${params.uuid}"}) 
    WHERE NOT s:softDeleted 
    RETURN s;
`;

const deleteLessonQuery = (params) => `
    MATCH (s: Section {uuid: "${params.uuid}"})
    SET s:softDeleted;
`;

const updateLessonQuery = (body) => {
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
      MATCH (s: Section {uuid: "${body.uuid}"})
      WHERE NOT s:softDeleted
      SET ${propsToUpdate.join(", ")}
      RETURN s;
    `;

    return updateQuery;
};

module.exports = {
    createLessonQuery,
    getLessonsQuery,
    updateLessonQuery,
    findLessonQuery,
    deleteLessonQuery
};