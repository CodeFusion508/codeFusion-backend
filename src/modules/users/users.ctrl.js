const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

const {
  findRegisteredUser,
  signUpQuery,
  logInQuery,
  getUserQuery,
  updateUserQuery,
  deleteUserQuery,

  createRelQuery,
  deleteRelQuery
} = require("./users.query.js");
const {
  cleanNeo4j,
  cleanRecord,
  cleanRel
} = require("../../utils/cleanData.js");
const jwt = require("../../config/jwt.js");

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

// Student CRUD
const createUser = async ({ services }, body) => {
  const findUser = findRegisteredUser(body);
  const result = await services.neo4j.session.run(findUser);

  if (result.records.length !== 0) throw { err: 403, message: "Este correo electrónico ya ha sido registrado, utilice otro o inicie sesión." };

  body.password = bcrypt.hashSync(body.password, saltScript);
  const uuid = v4();
  const query = signUpQuery(uuid, body);

  let data = await services.neo4j.session.run(query);
  data = cleanNeo4j(data);
  cleanRecord(data);

  const { email, password } = data.node;
  return { data, token: jwt.createToken(email, password) };
};

const logIn = async ({ services }, body) => {

  const query = logInQuery(body);
  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 403, message: "Este correo electrónico o contraseña es incorrecto, inténtalo de nuevo." };

  data = cleanNeo4j(data);
  cleanRecord(data);

  if(!data.node.hasOwnProperty('password')) throw({ err: 400, message: "El correo electronico de la cuenta fue registra mediante google" })

  if (!bcrypt.compareSync(body.password, data.node.password)) throw { err: 403, message: "Este correo electrónico o contraseña es incorrecto, inténtalo de nuevo." };

  return {
    data,
    token: jwt.createToken({
      userName : data.node.userName,
      email    : data.node.email,
      uuid     : data.node.uuid
    })
  };

};

const getUser = async ({ services }, params) => {
  const query = getUserQuery(params);

  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 404, message: "Este usuario no existe, verifique si tiene el uuid válido." };

  data = cleanNeo4j(data);
  cleanRecord(data);

  return data;
};

const updateUser = async ({ services }, body) => {
  if (Object.keys(body).length < 2) throw { err: 400, message: "Debe indicar al menos un cambio." };

  if (body.password) {
    body.password = bcrypt.hashSync(body.password, saltScript);
  }
  const query = updateUserQuery(body);

  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 404, message: "Este usuario no existe, verifique si tiene el uuid válido." };

  data = cleanNeo4j(data);
  cleanRecord(data);

  return data;
};

const deleteUser = async ({ services }, params) => {
  const query = deleteUserQuery(params);

  let data = await services.neo4j.session.run(query);
  data = cleanNeo4j(data);

  return data;
};

// Student Relationships

const createRel = async ({ services }, body) => {
  const query = createRelQuery(body);

  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 404, message: "Este usuario no existe, verifique si tiene el uuid válido." };

  data = cleanNeo4j(data);
  cleanRel(data);

  return data;
};

const deleteRel = async ({ services }, body) => {
  const query = deleteRelQuery(body);

  let data = await services.neo4j.session.run(query);
  data = cleanNeo4j(data);

  return data;
};

Object.assign(module.exports, {
  createUser,
  logIn,
  getUser,
  updateUser,
  deleteUser,

  createRel,
  deleteRel,
});