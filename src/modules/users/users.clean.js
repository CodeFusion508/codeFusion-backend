const cleanNeo4j = (data) => {
    return {
        stats : data.summary.counters._stats,
        node  : data.records
    };
};

const cleanRecord = (data) => {
    const obj = {
        ...data.node[0]._fields[0]
    };

    data.node = obj;
};

module.exports = {
    cleanNeo4j,
    cleanRecord
};