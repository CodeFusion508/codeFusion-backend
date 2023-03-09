const usersQuery = require("./users.query.js");

module.exports = (deps) =>
  Object
    .entries(module.exports)
    .reduce((acc, [name, method]) => ({
      ...acc,
      [name]: method.bind(null, Object.assign({}, module.exports, deps))
    }), {});


const createUser = async(deps, data) => {
  const query = await usersQuery.createUser().build();


  return deps.services.neo4j.session.run(query);
};

const getUsers = (deps, data) => {

};

const putUser = (deps, data) => {

};


Object.assign(module.exports, {
  createUser,
  getUsers,
  putUser
});