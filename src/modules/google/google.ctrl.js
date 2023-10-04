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


module.exports = (deps) => Object.entries(module.exports).reduce((acc, [name, method]) => ({
  ...acc,
  [name]: method.bind(null, { ...module.exports, ...deps })
}), {});


const createGUser = async ({ services }, body) => {
  const uuid = v4();
  const { query, queryParams } = googleSignUpQuery(uuid, body);

  let result = await services.neo4j.session.run(query, queryParams);
  result = cleanNeo4j(result);
  cleanRecord(result);

  const { email, userName } = result.node;
  return {
    data  : result,
    token : jwt.createToken({
      userName,
      email,
      uuid
    })
  };
};

const loginGUser = async ({ services }, body, result) => {
  const responseToken = await services.google.client.verifyIdToken({ idToken: body.idToken });

  if (responseToken === undefined) throw { err: 403, message: "Autenticación de Google falló" };

  result = cleanNeo4j(result);
  cleanRecord(result);

  const {
    email,
    userName,
    uuid
  } = result.node;
  return {
    token: jwt.createToken({
      userName,
      email,
      uuid
    }),
    data: result
  };
};

const gAuthentication = async ({ services }, body) => {
  const { query, queryParams } = findRegisteredEmail(body);
  let result = await services.neo4j.session.run(query, queryParams);

  if (result.records.length !== 0) {
    return loginGUser({ services }, body, result);
  }

  return createGUser({ services }, body);
};

const getUserAnswers = async ({ services }, body) => {
  const data = await getAllAnswersQuery(services.google, body.sheet_id);

  return data;
};

const getEvaluation = async ({ services }, body) => {
  const data = await getEvaluationQuery(services.google, body.sheet_id, body.email);

  return data;
};


Object.assign(module.exports, {
  gAuthentication,
  getUserAnswers,
  getEvaluation
});