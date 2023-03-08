const { Connection } = require("cypher-query-builder");

module.exports = async () => {
    const db = await new Connection(process.env.URI, {
        password : process.env.PASSWORD,
        username : process.env.USER
    });

    const cypher = {
        db
    };


    return cypher;
};