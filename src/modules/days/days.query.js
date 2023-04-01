const createDayQuery = (uuid, body) => {
    const query = `
        CREATE (d: Day
            {
                uuid: "${uuid}", 
                exp: 0,
                desc: "${body.desc}",
                dayNo: ${body.dayNo}
            }
        )
        RETURN d;
    `;

    return query;
};

const getDayQuery = (params) => {
    const query = `
        MATCH (d: Day {uuid: "${params.uuid}"}) 
        WHERE NOT d:softDeleted 
        RETURN d;
    `;

    return query;
};
const getDaysQuery = (params) => {
    const query = `
        MATCH (d: Day) 
        WHERE NOT d:softDeleted 
        RETURN d;
    `;
    return query;
};
const deleteDayQuery = (params) => `
    MATCH (d: Day {uuid: "${params.uuid}"})
    SET d:softDeleted;
`;

const updateDayQuery = (body) => {
    let propsToUpdate = [];

    if (body.exp) {
        propsToUpdate.push(`d.exp = ${body.exp}`);
    }
    if (body.desc) {
        propsToUpdate.push(`d.desc = "${body.desc}"`);
    }
    if (body.dayNo) {
        propsToUpdate.push(`d.dayNo = ${body.dayNo}`);
    }
    const updateQuery = `
      MATCH (d: Day {uuid: "${body.uuid}"})
      WHERE NOT d:softDeleted
      SET ${propsToUpdate.join(", ")}
      RETURN d;
    `;

    return updateQuery;
};


module.exports = {
    createDayQuery,
    getDayQuery,
    getDaysQuery,
    deleteDayQuery,
    updateDayQuery
};