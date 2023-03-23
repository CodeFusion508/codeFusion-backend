const { v4 } = require("uuid");

const {
  createUserQuery,
  deleteUserQuery,
  findRegisteredUser,
  findUserQuery,
  updateUserQuery
} = require("./users.query.js");
const {
  cleanNeo4j,
  cleanRecords
} = require("./users.clean.js");

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

    let data = await services.neo4j.session.run(query);
    data = await cleanNeo4j(data);
    data.uuid = uuid;

    return data;
  } else {
    throw { err: 403, message: "This email has already been registered, please use another or log in." };
  }
};

const deleteUser = async ({ services }, params) => {
  const query = deleteUserQuery(params);

  let data = await services.neo4j.session.run(query);
  data = await cleanNeo4j(data);

  return data;
};

const getUser = async ({ services }, params) => {
  const query = findUserQuery(params);
  let data = await services.neo4j.session.run(query);

  if (data.records.length !== 0) {
    data = await cleanNeo4j(data);
    await cleanRecords(data);

    return data;
  } else {
    throw { err: 404, message: "This user does not exist, please check if you have the valid uuid." };
  }
};

const updateUser = async ({ services }, body) => {
  const query = updateUserQuery(body);

  let data = await services.neo4j.session.run(query);
  data = await cleanNeo4j(data);

  return data;
};


Object.assign(module.exports, {
  createUser,
  deleteUser,
  getUser,
  updateUser,
});