const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

const {
  signUpQuery,
  logInQuery,
  findRegisteredEmailQuery,
  findDeletedStudentQuery,
  getStudentQuery,
  updateStudentQuery,
  deleteStudentQuery,

  createRelQuery,
  deleteRelQuery
} = require("./students.query.js");
const { cleanNeo4j, cleanRecord, cleanRel } = require("../../utils/cleanData.js");
const jwt = require("../../config/jwt.js");

// Global Variables
const saltRounds = 10;
const saltScript = bcrypt.genSaltSync(saltRounds);
const MapConfirmAccount = new Map();
const MapRecoveryAccount = new Map();


module.exports = (deps) => Object.entries(module.exports).reduce((acc, [name, method]) => {
  return {
    ...acc,
    [name]: method.bind(null, { ...module.exports, ...deps })
  };
}, {});

// Student CRUD
const signUp = async ({ services }, body) => {
  const findStudent = findRegisteredEmailQuery(body);
  const result = await services.neo4j.session.run(findStudent);

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

  const { email, userName, uuid } = data.node;
  return { data, token: jwt.createToken({ userName, email, uuid }) };
};

const getStudent = async ({ services }, params) => {
  const query = getStudentQuery(params);
  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 404, message: "Este usuario no existe, verifique si tiene el uuid válido." };

  data = cleanNeo4j(data);
  cleanRecord(data);

  return data;
};

const updateStudent = async ({ services }, body) => {
  if (Object.keys(body).length < 2) throw { err: 400, message: "Debe indicar al menos un cambio." };

  const findStudent = findRegisteredEmailQuery(body);
  const result = await services.neo4j.session.run(findStudent);

  // This is to prevent people from updating their email to a different email address that is already in use
  if (result.records[0]._fields[0].properties.uuid !== body.uuid && result.records[0]._fields[0].properties.email === body.email) {
    throw { err: 403, message: "Este correo electrónico ya ha sido registrado, utilice otro o inicie sesión." };
  }

  if (body.password) {
    body.password = bcrypt.hashSync(body.password, saltScript);
  }

  const query = updateStudentQuery(body);
  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 404, message: "Este usuario no existe, verifique si tiene el uuid válido." };

  data = cleanNeo4j(data);
  cleanRecord(data);

  return data;
};

const deleteStudent = async ({ services }, params) => {
  const query = deleteStudentQuery(params);

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

// Other User Controllers
const WaitingForAccountConfirmation = async ({ services }, body) => {
  MapConfirmAccount.set(body.email, body);

  const token = jwt.createToken({ email: body.email });

  services.email.send(
    body.email,
    "Confirmación de Cuenta",
    services.template.confirmEmail(body.userName, `${process.env.FRONT_END_PATH}/cuenta/` + token + "/confirmacion")
  );

  return { data: "Se ha enviado un mensaje a " + body.email + " para confirmar tu cuenta" };
};

const recoveryAccount = async ({ services }, body) => {
  const query = findDeletedStudentQuery(body);
  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0) throw { err: 404, message: "Este usuario no existe o ya esta registrado" };

  data = cleanNeo4j(data);
  cleanRecord(data);

  const token = jwt.createToken({ uuid: data.node.uuid });

  services.email.send(
    body.email,
    "Recuperar Cuenta",
    services.template.confirmEmail(data.node.userName, `${process.env.FRONT_END_PATH}/recovery/` + token + "/account")
  );

  MapRecoveryAccount.set(body.email, data.node.uuid);

  return { message: "Se ha enviado un mensaje al correo " + body.email + " para recuperar tu cuenta" };
};

const confirmAccount = async ({ services }, params) => {
  const token = jwt.decodeToken(params.token);
  const body = MapConfirmAccount.get(token.email);

  if (body === undefined) throw ({ err: 404, message: "El token no existe" });

  await signUp({ services }, body);

  return {
    title   : "Confirmación de Cuenta",
    message : "Bienvenido a CodeFusion508"
  };
};


Object.assign(module.exports, {
  signUp,
  logIn,
  getStudent,
  updateStudent,
  deleteStudent,

  createRel,
  deleteRel,

  WaitingForAccountConfirmation,
  recoveryAccount,
  confirmAccount
});