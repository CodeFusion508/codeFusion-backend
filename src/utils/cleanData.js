const cleanNeo4j = (data) => {
    return {
        stats : data.summary.counters._stats,
        node  : data.records
    };
};

const cleanRecord = (data) => {
    let obj = {
        labels: data.node[0]._fields[0].labels,
        ...data.node[0]._fields[0].properties
    };

    for (const key in obj) {
        if (obj[key].low === undefined || obj[key].low === null) {
            continue;
        } else {
            obj[key] = obj[key].low;
        }
    }
    data.node = obj;
};

const cleanRecords = (data) => {
    let arr = [];

    for (let i = 0; i < data.node.length; i++) {
        let obj = {
            labels: data.node[i]._fields[0].labels,
            ...data.node[i]._fields[0].properties
        };

        for (const key in obj) {
            if (obj[key].low === undefined) {
                continue;
            } else {
                obj[key] = obj[key].low;
            }
        }

        arr.push(obj);
    }

    data.node = arr;
};

const cleanRel = (data) => {
    let obj = {
        type       : data.node[0]._fields[0].type,
        properties : data.node[0]._fields[0].properties
    };

    for (const key in obj.properties) {
        if (obj.properties[key].low === undefined) {
            continue;
        } else {
            obj.properties[key] = obj.properties[key].low;
        }
    }

    data.node = obj;
};

const cleanRels = (data) => {
    let arr = [];

    for (let i = 0; i < data.node.length; i++) {
        let obj = {
            node: {
                labels: data.node[i]._fields[0].labels,
                ...data.node[i]._fields[0].properties
            },
            rels: {
                type       : data.node[i]._fields[1].type,
                properties : data.node[i]._fields[1].properties
            }
        };

        for (const key in obj.node) {
            if (obj.node[key].low === undefined) {
                continue;
            } else {
                obj.node[key] = obj.node[key].low;
            }
        }
        for (const key in obj.rels.properties) {
            if (obj.rels.properties[key].low === undefined) {
                continue;
            } else {
                obj.rels.properties[key] = obj.rels.properties[key].low;
            }
        }

        arr.push(obj);
    }

    data.node = arr;
};

module.exports = {
    cleanNeo4j,
    cleanRecord,
    cleanRecords,
    cleanRel,
    cleanRels
};