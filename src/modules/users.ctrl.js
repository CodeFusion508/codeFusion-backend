module.exports = (deps) =>
    Object
        .entries(module.exports)
        .reduce((acc, [name, method]) => ({
            ...acc,
            [name]: method.bind(null, Object.assign({}, module.exports, deps))
        }), {});


const getUsers = (/*deps, data */) => {

    return new Promise((resolve/*, reject */) => {
        setTimeout(() => {
          resolve("ALL USERS");
        }, 300);
      });
};

const putUser = (/*deps, data */) => {

    return new Promise((resolve/*, reject */) => {
        setTimeout(() => {
          resolve("SIGNED UP");
        }, 300);
      });
};


Object.assign(module.exports, {
    getUsers,
    putUser
});