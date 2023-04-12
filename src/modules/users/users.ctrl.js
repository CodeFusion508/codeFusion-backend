const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const jwt = require("../../config/jwt.txt");

const {
  createUserQuery,
  deleteUserQuery,
  findRegisteredUser,
  findUserQuery,
  updateUserQuery,
  logInQuery,
  createRelationQuery,
  deleteRelation
} = require("./users.query.js");
const {
  cleanNeo4j,
  cleanRecord,
  cleanRel
} = require("../../utils/cleanData.js");

const saltRounds = 10;
const saltScript = bcrypt.genSaltSync(saltRounds);

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

  if (result.records.length !== 0) throw { err: 403, message: "This email has already been registered, please use another or log in." };

  body.password = bcrypt.hashSync(body.password, saltScript);
  const uuid = v4();
  const query = createUserQuery(uuid, body);

  let data = await services.neo4j.session.run(query);
  data = cleanNeo4j(data);
  cleanRecord(data);

  const { email, password } = data.node;
  return { data, token: jwt.createToken(email, password) };
};

const deleteUser = async ({ services }, params) => {
  const query = deleteUserQuery(params);

  let data = await services.neo4j.session.run(query);
  data = cleanNeo4j(data);

  return data;
};

const getUser = async ({ services }, params) => {
  const query = findUserQuery(params);

  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 404, message: "This user does not exist, please check if you have the valid uuid." };

  data = cleanNeo4j(data);
  cleanRecord(data);

  return data;
};

const updateUser = async ({ services }, body) => {
  if (Object.keys(body).length < 2) throw { err: 400, message: "You must provide at least one change." };
  const query = updateUserQuery(body);

  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 404, message: "This user does not exist, please check if you have the valid uuid." };

  data = cleanNeo4j(data);
  cleanRecord(data);

  return data;
};

const logIn = async ({ services }, body) => {
  const query = logInQuery(body);
  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 403, message: "This email or password is incorrect, please try again." };

  data = cleanNeo4j(data);
  cleanRecord(data);

  if (!bcrypt.compareSync(body.password, data.node.password)) throw { err: 403, message: "This email or password is incorrect, please try again." };

  return {
    data,
    token: jwt.createToken({
      userName : data.node.userName,
      email    : data.node.email,
      uuid     : data.node.uuid
    })
  };
};

const createRelation = async ({ services }, body) => {
  const query = createRelationQuery(body);

  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 404, message: "This user does not exist, please check if you have the valid uuid." };

  data = cleanNeo4j(data);
  cleanRel(data);

  return data;
};

const deletedRelation = async ({ services }, body) => {
  const query = deleteRelation(body);

  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 404, message: "This user does not exist, please check if you have the valid uuid." };

  data = cleanNeo4j(data);

  return data;
};

Object.assign(module.exports, {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  logIn,
  createRelation,
  deletedRelation
});