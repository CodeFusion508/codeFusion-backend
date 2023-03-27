const { request, response } = require('express')
const jwt = require("jsonwebtoken");
const SEED = require("../config/config.txt").SEED

const verifyToken = (req = request, res = response, next = Function) => {

    const auth = req.headers.authorization

    if (auth === undefined) throw ({ message: 'No tienes autorización', status: 401 })

    const token = auth.split(' ')[1]

    if (token === undefined) throw ({ message: 'No tienes autorización', status: 401 })

    const infoToken = jwt.decode(token, SEED)

    if (infoToken === undefined) throw ({ message: 'Token Invalido', status: 401 })

    if(req.method.toUpperCase() === "GET") {
        req["params"]["uuid"] = infoToken.sub
    } else {
        req["body"]["uuid"] = infoToken.sub
    }
    next()
}

module.exports = { verifyToken }