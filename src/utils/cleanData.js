const cleanNeo4j = (data) => {
    return {
        stats : data.summary.counters._stats,
        node  : data.records
    };
};

const cleanRecord = (data) => {
    let obj = {
        ...data.node[0]._fields[0]
    };

    obj.identity = obj.identity.low;
    for (const key in obj.properties) {
        if (obj.properties[key].low) {
            obj.properties[key] = obj.properties[key].low;
        }
    }

    data.node = obj;
};

const cleanRecords = (data) => {
    let arr = [];

    for (let i = 0; i < data.node.length; i++) {
        let obj = {
            ...data.node[i]._fields[0]
        };

        obj.identity = obj.identity.low;
        for (const key in obj.properties) {
            if (obj.properties[key].low) {
                obj.properties[key] = obj.properties[key].low;
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