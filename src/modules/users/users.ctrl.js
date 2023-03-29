const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const jwt = require("../../config/jwt.txt");

const {
  createUserQuery,
  deleteUserQuery,
  findRegisteredUser,
  findUserQuery,
  updateUserQuery,
  logInQuery
} = require("./users.query.js");
const {
  cleanNeo4j,
  cleanRecord
} = require("./users.clean.js");

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

  if (result.records.length === 0) {
    body.password = bcrypt.hashSync(body.password, saltScript);
    const uuid = v4();
    const query = createUserQuery(uuid, body);

    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);
    cleanRecord(data);

    const { email, password } = data.node.properties;
    return { data, token: jwt.createToken(email, password) };
  } else {
    throw { err: 403, message: "This email has already been registered, please use another or log in." };
  }
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

  if (data.records.length !== 0) {
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
  } else {
    throw { err: 404, message: "This user does not exist, please check if you have the valid uuid." };
  }
};

const updateUser = async ({ services }, body) => {
  const query = updateUserQuery(body);

  let data = await services.neo4j.session.run(query);

  if (data.records.length !== 0) {
    data = cleanNeo4j(data);
    cleanRecord(data);

    return data;
  } else {
    throw { err: 404, message: "This user does not exist, please check if you have the valid uuid." };
  }
};

const logIn = async ({ services }, body) => {
  const query = logInQuery(body);
  let data = await services.neo4j.session.run(query);

  if (data.records.length !== 0) {
    data = cleanNeo4j(data);
    cleanRecord(data);

    const {
      email,
      password,
      userName,
      uuid
    } = data.node.properties;

    if (!bcrypt.compareSync(body.password, password)) throw { err: 403, message: "This email or password is incorrect, please try again." };

    return {
      data, token: jwt.createToken({
        userName, email, uuid
      })
    };
  } else {
    throw { err: 403, message: "This email or password is incorrect, please try again." };
  }
};


Object.assign(module.exports, {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  logIn
});