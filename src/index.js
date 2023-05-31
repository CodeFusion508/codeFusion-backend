const { config } = require("dotenv");
config();

const App = require("./app.js");
const Controllers = require("./controllers.js");
const Services = require("./services.js");

const servicesList = {
    google   : require("./services/google.js"),
    neo4j    : require("./services/neo4j.js"),
    email    : require("./services/nodemailer.js"),
    template : require("./services/template.js")
};

const ctrlList = {
    contentsCtrl : require("./modules/content/content.ctrl.js"),
    daysCtrl     : require("./modules/days/days.ctrl.js"),
    googleCtrl   : require("./modules/google/google.ctrl.js"),
    sprintsCtrl  : require("./modules/sprints/sprints.ctrl.js"),
    usersCtrl    : require("./modules/users/users.ctrl.js")
};

const start = async () => {
    let dependencies = {
        config   : {},
        ctrls    : {},
        services : {}
    };

    dependencies.services = await Services(dependencies, servicesList);

    dependencies.ctrls = await Controllers(dependencies, ctrlList);

    await App(dependencies);
};

if (require.main === module) {
    process.stdout.write("\x1b[4mStarting Server\x1b[24m\x1b[0m" + "\n");

    start();
}