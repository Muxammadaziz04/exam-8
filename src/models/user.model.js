const { fetchData } = require('../utils/postgress.js')



const login = async (username, password) => {
    try {
        const loginUserQuery = `select * from users where username = $1 and password = $2`
        return await fetchData(loginUserQuery, username, password);
    } catch (error) {
        console.error(error);
    }
}

const register = async (username, password) => {
    try {
        const registerQuery = `insert into users (username, password) values ($1, $2) returning *`
        return await fetchData(registerQuery, username, password);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login, register
}