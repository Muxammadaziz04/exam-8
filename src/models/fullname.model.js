const { fetchData } = require('../utils/postgress')

const getFullnamesModel = async () => {
    try {
        const getFullnamesQuery= `select p.fullname from posts as p group by fullname;`
        return await fetchData(getFullnamesQuery)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getFullnamesModel
}