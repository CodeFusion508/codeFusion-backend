const {
  createUserQuery,
  findUserQuery,
  updateUserQuery
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


const createUser = async ({ services }, { body }) => {
  const query = createUserQuery(body);

  return await services.neo4j.session.run(query);
};

const getUser = async ({ services }, { params }) => {
  const query = findUserQuery(params);

  return await services.neo4j.session.run(query);
};

const updateUser = async ({ services }, { body }) => {
  const query = updateUserQuery(body);

  return await services.neo4j.session.run(query);
};

Object.assign(module.exports, {
  createUser,
  getUser,
  updateUser
});