module.exports = (deps) =>
  Object
    .entries(module.exports)
    .reduce((acc, [name, method]) => ({
      ...acc,
      [name]: method.bind(null, Object.assign({}, module.exports, deps))
    }), {});


const createUser = async ({ services }, data) => {
  const query = `CREATE (u: User {uuid: "${data.uuid}", totalExp: "0", weeklyExp: "0", email: "${data.email}", userName: "${data.userName}"})`;

  return await services.neo4j.session.run(query);
};

const getUser = async (deps, data) => {
  const query = `MATCH (u: User {uuid: "${data.uuid}"}) RETURN u`;

  return await deps.services.neo4j.session.run(query);
};


Object.assign(module.exports, {
  createUser,
  getUser
});