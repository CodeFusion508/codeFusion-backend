const cleanNeo4j = (data) => {
    if(!data.hasOwnProperty('records')) throw({ err: 500, message: "There is a problem with the query records" })
    return {
        stats : data.summary.counters._stats,
        node  : data.records
    }
};

const cleanRecord = (data) => {
    if(!data.hasOwnProperty('node')) throw({ err: 500, message: "There is a problem with the query nodes" })
    const obj = {
        ...data.node[0]._fields[0]
    };

    data.node = obj;
    return data
};

const cleanRecords = (data) => {
    if(!data.hasOwnProperty('node')) throw({ err: 500, message: "There is a problem with the query nodes" })
    let arr = [];
    if(data.node.length === 0) {
        data.node = arr
        return data
    }
    
    let obj;

    for (let i = 0; i < data.node.length; i++) {
        obj = {
            ...data.node[i]._fields[0]
        };

        arr.push(obj);
    }

    data.node = arr;

    return data
}

module.exports = {
    cleanNeo4j,
    cleanRecord,
    cleanRecords
};