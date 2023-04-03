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

const cleanRecords = (data = { stats: {}, node: []}) => {

    let arr = [];
    let obj;
    const indexByProperties = 0

    return data.node.map(value => {

        const newObjTemp = {}
        const obj = value._fields[indexByProperties]
        for (const key in obj.properties) {

            newObjTemp[key] = obj.properties[key]
            const properties = obj.properties[key];
            if(properties.hasOwnProperty('low')) {
                newObjTemp[key] = obj.properties[key]['low']
            } 
        }

        return newObjTemp

    })

    for (let i = 0; i < data.node.length; i++) {
        obj = {
            ...data.node[i]._fields[0]
        };

        // obj.identity = obj.identity.low;
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