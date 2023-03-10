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


const createUser = async ({ services }, data) => {
  const query = createUserQuery(data);

  return await services.neo4j.session.run(query);
};

const getUser = async ({ services }, data) => {
  const query = findUserQuery(data);

  return await services.neo4j.session.run(query);
};


Object.assign(module.exports, {
  createUser,
  getUser
});