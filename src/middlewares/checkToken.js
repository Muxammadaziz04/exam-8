const jwt = require('../utils/jwt')

function checkAdmin(req, res, next) {
    try {
        let token = req.headers.token
        if (!token) throw new Error('token yoq')

        token = jwt.verify(token)

        if(token.user_id == '8b092ad8-21eb-48b9-bab3-c7ec470b7ef7') {
            next()
        } else{
            throw new Error('you are not admin')    
        }

    } catch (error) {
        next({
            error: {
                message: error.message || 'token yoq yoki notogri'
            }
        })
    }
}

const checkToken = (req, res, next) => {
    try {
        let token = req.headers.token

        if (!token) throw new Error('token yoq')

        token = jwt.verify(token)

        next()
    } catch (error) {
        next({
            error: {
                message: error.message || 'token yoq yoki notogri'
            }
        })
    }
}

module.exports = {
    checkAdmin, checkToken
}
