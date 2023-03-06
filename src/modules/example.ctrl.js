module.exports = (deps) =>
    Object
        .entries(module.exports)
        .reduce((acc, [name, method]) => ({
            ...acc,
            [name]: method.bind(null, Object.assign({}, module.exports, deps))
        }), {});


const example = (deps) => {
    console.log("Here is a example controller function", "here is deps ->", deps);
    return "hello";
};


Object.assign(module.exports, {
    example
});