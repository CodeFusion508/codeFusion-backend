const { Connection } = require("cypher-query-builder");

module.exports = () => {
    const db = new Connection(process.env.URI, {
        password : process.env.PASSWORD,
        username : process.env.USER
    });

    const cypher = {

    };


    return cypher;
};