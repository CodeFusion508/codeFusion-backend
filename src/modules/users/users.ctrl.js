const {
  createUserQuery,
  deleteUserQuery,
  findRegisteredUser,
  findUserQuery,
  updateUserQuery
} = require("./users.query.js");

const { v4 } = require("uuid");


module.exports = (deps) =>
  Object
    .entries(module.exports)
    .reduce((acc, [name, method]) => {
      return {
        ...acc,
        [name]: method.bind(null, Object.assign({}, module.exports, deps))
      };
    }, {});


const createUser = async ({ services }, body) => {
  const findUser = findRegisteredUser(body);

  const result = await services.neo4j.session.run(findUser);

  if (result.records.length === 0) {
    const uuid = v4();
    const query = createUserQuery(uuid, body);

    return await services.neo4j.session.run(query);
  }
  else throw 403;
};

const deleteUser = async ({ services }, params) => {
  const query = deleteUserQuery(params);

  return await services.neo4j.session.run(query);
};

const getUser = async ({ services }, params) => {
  const query = findUserQuery(params);

  return await services.neo4j.session.run(query);
};

const updateUser = async ({ services }, body) => {
  const query = updateUserQuery(body);

  return await services.neo4j.session.run(query);
};


Object.assign(module.exports, {
  createUser,
  deleteUser,
  getUser,
  updateUser,
});