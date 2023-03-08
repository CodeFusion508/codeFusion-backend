const neo4jDriver = require("neo4j-driver");


module.exports = async () => {
    const driver = await neo4jDriver.driver(
        process.env.URI,
        neo4jDriver.auth.basic(process.env.USER, process.env.PASSWORD)
    );

    const session = driver.session();


    const read = driver.session({
        defaultAccessMode: neo4jDriver.session.READ
    });

    const write = driver.session({
        database          : process.env.DBNAME,
        defaultAccessMode : neo4jDriver.session.WRITE
    });

    const neo4j = {
        driver,
        read,
        session,
        write
    };

    return neo4j;
};