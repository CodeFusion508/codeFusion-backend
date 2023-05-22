const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

const {
  findRegisteredEmail,
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
const MapConfirmAccount = new Map();
const MapRecoveryAccount = new Map();

module.exports = (deps) =>
  Object
    .entries(module.exports)
    .reduce((acc, [name, method]) => {
      return {
        ...acc,
        [name]: method.bind(null, Object.assign({}, module.exports, deps))
      };
    }, {});

const WaitingForAccountConfirmation = async ({ services }, body) => {
  body["password"] = bcrypt.hashSync(body["password"], saltScript);
  MapConfirmAccount.set(body["email"], body);
  const token = jwt.createToken({ email: body["email"] });
  services.email.send(
    body.email,
    "Confirmación de Cuenta",
    services.templete.confirmEmail(body.userName, "http://localhost:5173/cuenta/"+token+"/confirmacion")
  );

  return { data: "Se ha enviado un mensaje a "+body.email+" para confirmar tu cuenta" };
};

const recoveryAccount = async ({ services }, body ) => {

  let data = await services.neo4j.session.run(logInQuery(body));
  if (data.records.length === 0) throw { err: 404, message: "Este usuario no existe, verifique si tiene el uuid válido." };

  data = cleanNeo4j(data);
  cleanRecord(data);

  const token = jwt.createToken({ uuid: data.node.uuid });
  services.email.send(body.email, "Recuperar Cuenta",
  services.templete.confirmEmail(data.node.userName, "http://localhost:5173/recovery/"+token+"/account"));
  MapRecoveryAccount.set(body.email, data.node.uuid);
  return {
    message: "Se ha enviado un mensaje al correo "+body.email+" para recuperar tu cuenta"
  };

};

const updatedPassword = async ({ services }, params ) => {
  const token = jwt.decodeToken(params.token);
  const body = MapRecoveryAccount.get(token.email);
  body["password"] = bcrypt.hashSync(params["password"], saltScript);
  const query = updateUserQuery(body);

  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 404, message: "Este usuario no existe, verifique si tiene el uuid válido." };

  data = cleanNeo4j(data);
  cleanRecord(data);

  return { procces: true };

};

const confirmAccount = async ({ services }, params) => {
  const token = jwt.decodeToken(params.token);
  const body = MapConfirmAccount.get(token.email);
  if(body === undefined) throw({ err: 404, message: "El token no existe" });
  await createUser({ services }, body);
  return {
    title   : "Confirmación de Cuenta",
    message : "Bienvenido a CodeFusion508"
  };
 };

// Student CRUD
const createUser = async ({ services }, body) => {
  const findUser = findRegisteredEmail(body);
  const result = await services.neo4j.session.run(findUser);

  if (result.records.length !== 0) throw { err: 403, message: "Este correo electrónico ya ha sido registrado, utilice otro o inicie sesión." };

  body.password = bcrypt.hashSync(body.password, saltScript);
  const uuid = v4();
  const query = signUpQuery(uuid, body);

  let data = await services.neo4j.session.run(query);
  data = cleanNeo4j(data);
  cleanRecord(data);

  const { email, userName } = data.node;
  return { data, token: jwt.createToken({ uuid, userName, email }) };
};

const logIn = async ({ services }, body) => {

  const query = logInQuery(body);
  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 403, message: "Este correo electrónico o contraseña es incorrecto, inténtalo de nuevo." };

  data = cleanNeo4j(data);
  cleanRecord(data);

  if (!Object.prototype.hasOwnProperty.call(data.node, "password")) throw { err: 400, message: "El correo electrónico de la cuenta fue registrado mediante google" };

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

  const findUser = findRegisteredEmail(body);
  const result = await services.neo4j.session.run(findUser);

  if (result.records[0]._fields[0].properties.uuid !== body.uuid && result.records[0]._fields[0].properties.email === body.email) {
    throw { err: 403, message: "Este correo electrónico ya ha sido registrado, utilice otro o inicie sesión." };
  }

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
  WaitingForAccountConfirmation,
  confirmAccount,
  createRel,
  deleteRel,
  updatedPassword,
  recoveryAccount
});