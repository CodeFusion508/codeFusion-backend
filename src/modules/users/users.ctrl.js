const neo4j = require("neo4j-driver");

const usersQuery = require("./users.query.js");

module.exports = (deps) =>
  Object
    .entries(module.exports)
    .reduce((acc, [name, method]) => ({
      ...acc,
      [name]: method.bind(null, Object.assign({}, module.exports, deps))
    }), {});


const createUser = async ({ services }, data) => {
  const query = await usersQuery.createUser(data).build();


  return await services.neo4j.session.run(query);
};

const getUsers = async (deps, data) => {
  const query = await usersQuery.getUsers().build();


  return deps.services.neo4j.session.run(query);
};


Object.assign(module.exports, {
  createUser,
  getUsers
});