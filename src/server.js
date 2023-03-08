const dotenv = require("dotenv");

const App = require("./app.js");
const Controllers = require("./controllers.js");
const Services = require("./services.js");

const servicesList = {
    cypher : require("./services/cypherQuery.js"),
    neo4j  : require("./services/neo4j.js")
};

const ctrlList = {
    usersCtrl: require("./modules/users.ctrl.js")
};

const start = async () => {
    let dependencies = {
        config   : {},
        ctrls    : {},
        services : {}
    };

    dotenv.config();

    Object.assign(dependencies.services, await Services(dependencies, servicesList));
    Object.assign(dependencies, dependencies.services);

    Object.assign(dependencies.ctrls, Controllers(dependencies, ctrlList));
    Object.assign(dependencies, dependencies.ctrls);

    const app = await App(dependencies);
    dependencies.app = app;

    return dependencies;
};

if (require.main === module) {
    process.stdout.write("\x1b[4mStarting Server\x1b[24m\x1b[0m" + "\n");

    start();
}