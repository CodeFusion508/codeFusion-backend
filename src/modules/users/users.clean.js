const cleanNeo4j = (data) => {

    return {
        stats   : data.summary.counters._stats,
        records : data.records,
    };
};

const cleanRecords = (data) => {
    let arr = [];

    for (let i = 0; i < data.records.length; i++) {
        let obj = {
            ...data.records[i]._fields[0]
        };

        arr.push(obj);
    }

    data.records = arr;
};

module.exports = {
    cleanNeo4j,
    cleanRecords
};