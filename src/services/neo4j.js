const neo4jDriver = require("neo4j-driver");

module.exports = async () => {
    try {
        const driver = await neo4jDriver.driver(
            process.env.URI,
            neo4jDriver.auth.basic(process.env.DB_USER, process.env.PASSWORD),
            {
                maxConnectionLifetime        : 30 * 60 * 1000,
                maxConnectionPoolSize        : 50,
                connectionAcquisitionTimeout : 2 * 60 * 1000
            }
        );

<<<<<<< HEAD
        if(!await driver.verifyAuthentication()) throw({message: "Neo4j Authentication Error"});
=======
        if (!await driver.verifyAuthentication()) throw ({ message: "Auth neo4j error" });
>>>>>>> 12bbcd00201cc1156f1680d6333804cb3557139e
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