const sha256 = require('sha256')
const jwt = require('../utils/jwt.js')
const model = require('../models/user.model.js')

const login = async (req, res, next) => {
    try {
        let {username, password} = req.body
        password = sha256(password)
        let response = await model.login(username, password)
       
        if( !response.length || response.error ) {
            return next(response)
        }
  
        res.status(200).send({
            message: "successful logined",
            status: 200,
            token: jwt.sign({ user_id: response[0].user_id })
        })
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res, next) => {
    try {
        let {username, password} = req.body
        let response = await model.register(username, password)
        
        if( response.error || !response.length ) return next(response)

        res.status(201).send({
            message: "successful register",
            status: 201,
            token: jwt.sign({ user_id: response[0].user_id })
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports ={
    login, register
}