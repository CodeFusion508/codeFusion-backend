const { v4 } = require("uuid");
const jwt = require("../../config/jwt.js");

const {
  googleSignUpQuery,
  findRegisteredEmail
} = require("./google.query.js");
const {
  cleanNeo4j,
  cleanRecord
} = require("../../utils/cleanData.js");
const {
  getAllAnswersQuery,
  getEvaluationQuery
} = require("../../utils/gFormsAnswers.js");


module.exports = (deps) => Object.entries(module.exports).reduce((acc, [name, method]) => {
  return {
    ...acc,
    [name]: method.bind(null, { ...module.exports, ...deps })
  };
}, {});


const createGUser = async ({ services }, body) => {
  const findUser = findRegisteredEmail(body);
  let result = await services.neo4j.session.run(findUser);

  if (result.records.length !== 0) {
    const responseToken = await services.google.client.verifyIdToken({ idToken: body.idToken });

    if (responseToken === undefined) throw { err: 403, message: "Autenticación de Google falló" };

    result = cleanNeo4j(result);
    cleanRecord(result);

    const { email, userName, uuid } = result.node;
    return {
      token : jwt.createToken({ userName, email, uuid }),
      data  : result
    };
  }

  const uuid = v4();
  const query = googleSignUpQuery(uuid, body);

  let data = await services.neo4j.session.run(query);
  data = cleanNeo4j(data);
  cleanRecord(data);

  const { email, userName } = data.node;
  return {
    data,
    token: jwt.createToken({ userName, email, uuid })
  };
};

const loginGUser = async ({ services }, body) => {
  const ticket = await services.google.client.verifyIdToken({ idToken: body.idToken });

  const payload = ticket.getPayload();

  if (payload) return true;

  throw { err: 400, message: "Token Invalido" };
};

const getUserAnswers = async ({ services }, body) => {
  const data = await getAllAnswersQuery(services.google, body.sheet_id)
    .catch((error) => {
      throw { err: 400, message: `${error}` };
    });

  return data;
};

const getEvaluation = async ({ services }, body) => {
  const data = await getEvaluationQuery(services.google, body.sheet_id, body.email)
    .catch((error) => {
      throw { err: 400, message: `${error}` };
    });

  return data;
};


Object.assign(module.exports, {
  getUserAnswers,
  getEvaluation,
  createGUser,
  loginGUser
});