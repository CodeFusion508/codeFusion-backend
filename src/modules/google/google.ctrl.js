const { v4 } = require("uuid");
const { client } = require("../../config/gAuth.js");

const {
  googleSignUpQuery,
  findRegisteredUser,
} = require("./google.query.js");

const {
  cleanNeo4j,
  cleanRecord
} = require("../../utils/cleanData.js");

const {
  getAllAnswersQuery,
  getEvaluationQuery,
} = require("../../utils/gFormsAnswers.js");
const jwt = require("../../config/jwt.js");

module.exports = (deps) =>
  Object
    .entries(module.exports)
    .reduce((acc, [name, method]) => {
      return {
        ...acc,
        [name]: method.bind(null, Object.assign({}, module.exports, deps))
      };
    }, {});

const createGUser = async ({ services }, body) => {

  try {
    const findUser = findRegisteredUser(body);
    let result = await services.neo4j.session.run(findUser);
  
  
    if (result.records.length !== 0) {
      const responseToken = await client.verifyIdToken({ idToken: body.idToken });
  
      if (responseToken === undefined) throw ({ message: "Autenticación de Google falló", status: 500 });
  
      result = cleanNeo4j(result);
      cleanRecord(result);
  
      const { email } = result.node;
      return { token: jwt.createToken(email), data: result };
    }
  
    const uuid = v4();
    const query = googleSignUpQuery(uuid, body);
  
    let data = await services.neo4j.session.run(query);
    data = cleanNeo4j(data);
    cleanRecord(data);
  
  
    const { email } = data.node;
    return { data, token: jwt.createToken(email) }
    
  } catch (error) {
    console.log(error)
  }
    

};

const loginGUser = async (_, body) => {
    const ticket = await client.verifyIdToken({ idToken: body.idToken });
    const payload = ticket.getPayload();

    if (payload) return true;

};

const getUserAnswers = async (_, body) => {
  const data = await getAllAnswersQuery(body.sheet_id)
    .catch((error) => {
      throw ({ message: `${error}`, status: 400 });
    });

  return data;
};

const getEvaluation = async (_, body) => {
  const data = await getEvaluationQuery(body.sheet_id, body.email)
    .catch((error) => {
      throw ({ message: `${error}`, status: 400 });
    });

  return data;
};

Object.assign(module.exports, {
  getUserAnswers,
  getEvaluation,
  createGUser,
  loginGUser
});