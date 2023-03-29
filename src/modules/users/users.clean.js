const cleanNeo4j = (data) => {
    if(!data.hasOwnProperty('summary') || !data.hasOwnProperty('records')) throw({ err: 500, message: "There is a problem with the query records" })
    return {
        stats : data.summary.counters._stats,
        node  : data.records
    };
};

const cleanRecord = (data) => {
    if(!data.hasOwnProperty('node')) throw({ err: 500, message: "There is a problem with the query nodes" })
    const obj = {
        ...data.node[0]._fields[0]
    };

    data.node = obj;
};

const cleanRecords = (data) => {
    if(data.length === 0 ) return []
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