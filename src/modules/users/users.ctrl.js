module.exports = (deps) =>
  Object
    .entries(module.exports)
    .reduce((acc, [name, method]) => ({
      ...acc,
      [name]: method.bind(null, Object.assign({}, module.exports, deps))
    }), {});


const getUsers = (deps, data) => {

};

const putUser = (deps, data) => {

};


Object.assign(module.exports, {
  getUsers,
  putUser
});