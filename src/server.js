const App = require("./app.js");
const Controllers = require("./controllers.js");

const crtlList = {
    exampleCtrl: require("./modules/example.ctrl.js")
};

const start = async () => {
    let dependencies = {
        config: {},
        ctrls: {},
        services: {}
    };

    // Object.assign(dependencies.services, await Services(dependencies, something));

    // dependencies.services.neo4j = dependencies.services.neo4j.connections;

    // Object.assign(dependencies, dependencies.services);

    Object.assign(dependencies.ctrls, Controllers(dependencies, crtlList));
    Object.assign(dependencies, dependencies.crtls);

    let app = await App();

    dependencies.app = app;

    return dependencies;
};

if (require.main === module) {
    start();
}