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
    return data;
};

const cleanRecords = (data) => {
    if (data.node.length === 0) {
        data.node = arr;
        return data;
    }

    let arr = [];
    let obj;

    for (let i = 0; i < data.node.length; i++) {
        obj = {
            ...data.node[i]._fields[0]
        };

        arr.push(obj);
    }

    data.node = arr;
};

module.exports = {
    cleanNeo4j,
    cleanRecord,
    cleanRecords
};