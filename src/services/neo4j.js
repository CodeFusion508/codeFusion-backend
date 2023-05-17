const neo4jDriver = require("neo4j-driver");

module.exports = async () => {
    try {
        const driver = await neo4jDriver.driver(
            process.env.URI,
            neo4jDriver.auth.basic(process.env.DB_USER, process.env.PASSWORD), {
            maxConnectionLifetime        : 30 * 60 * 1000,
            maxConnectionPoolSize        : 50,
            connectionAcquisitionTimeout : 2 * 60 * 1000
        }
        );

        if(!await driver.verifyAuthentication()) throw({message: "Neo4j Authentication Error"});
        const session = driver.session();

        const neo4j = {
            driver,
            session
        };

        return neo4j;
    } catch (err) {
        throw new Error("Failed to establish connection to Neo4j: " + err.message);
    }
};