module.exports = (deps) =>
  Object
    .entries(module.exports)
    .reduce((acc, [name, method]) => ({
      ...acc,
      [name]: method.bind(null, Object.assign({}, module.exports, deps))
    }), {});


const createUser = async ({ services }, data) => {
  const user = {
    email    : "asdsadsa@gmail.com",
    password : "Xo9wgkL9jR485x",
    userName : "tacky008x",
    uuid     : "75eab8ef-51e3-49f2-b328-8bcc99ae83a0"
  };

  const query = `CREATE (u: User {uuid: "${user.uuid}", totalExp: "0", weeklyExp: "0", email: "${user.email}", userName: "${user.userName}"})`;

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