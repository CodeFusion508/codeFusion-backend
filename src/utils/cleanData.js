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

    obj.identity = obj.identity.low;
    for (const objKey in obj.properties) {
        if (obj.properties[objKey].low === undefined) {
            continue;
        } else {
            obj.properties[objKey] = obj.properties[objKey].low;
        }
    }

    data.node = obj;
};

const cleanRecords = (data) => {
    let arr = [];
    let obj;

    for (let i = 0; i < data.node.length; i++) {
        obj = {
            ...data.node[i]._fields[0]
        };

        obj.identity = obj.identity.low;
        for (const objKey in obj.properties) {
            if (obj.properties[objKey].low === undefined) {
                continue;
            } else {
                obj.properties[objKey] = obj.properties[objKey].low;
            }
        }

        arr.push(obj);
    }

    data.node = arr;
};

module.exports = {
    cleanNeo4j,
    cleanRecord,
    cleanRecords
};