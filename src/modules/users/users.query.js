const { Query } = require("cypher-query-builder");

const createUser = (data) => {
    let query = new Query();

    query
        .createNode("p", ["Person"]);

    return query;
};

module.exports = {
    createUser
};