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

        if (!await driver.verifyAuthentication()) throw ({ message: "Auth neo4j error" });
        const session = driver.session();

        const executeKeepAliveQuery = () => {
            session.run("MATCH (n) RETURN count(n) AS nodeCount")
                .then(result => {
                    process.stdout.write(`Keep alive query executed successfully. Node count: ${result.records[0].get("nodeCount")}\n`);
                })
                .catch(error => {
                    process.stdout.write("Error executing keep alive query:", error, "\n");
                });
        };

        // Schedule the keep alive query to run every 30 minutes
        const keepAliveInterval = 30 * 60 * 1000; // 30 minutes in milliseconds
        setInterval(executeKeepAliveQuery, keepAliveInterval);

        const neo4j = { driver, session };

        return neo4j;
    } catch (err) {
        throw new Error("Failed to establish connection to Neo4j: " + err.message);
    }
};