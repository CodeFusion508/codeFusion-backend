const cleanNeo4j = (data) => {

    return {
        stats   : data.summary.counters._stats,
        records : data.records,
    };
};

module.exports = {
    cleanNeo4j
};