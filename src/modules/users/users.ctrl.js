const {
  createUserQuery,
  findUserQuery
} = require("./users.query.js");

module.exports = (deps) =>
  Object
    .entries(module.exports)
    .reduce((acc, [name, method]) => {
      return {
        ...acc,
        [name]: method.bind(null, Object.assign({}, module.exports, deps))
      };
    }, {});


const createUser = async ({ services }, data) => await services.neo4j.session.run(createUserQuery);

const getUser = async (deps, data) => await deps.services.neo4j.session.run(findUserQuery);


Object.assign(module.exports, {
  createUser,
  getUser
});