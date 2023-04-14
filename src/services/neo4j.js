const neo4jDriver = require("neo4j-driver");


module.exports = async () => {
    const driver = await neo4jDriver.driver(
        process.env.URI,
        neo4jDriver.auth.basic(process.env.DB_USER, process.env.PASSWORD)
    );

    const session = await driver.session();

    const neo4j = {
        driver,
        session,
    };

    return neo4j;
};