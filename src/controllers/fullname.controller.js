const { getFullnamesModel } = require("../models/fullname.model");
const jwt = require("../utils/jwt");

const getFullnames = async (req, res, next) => {
    try {
        const response = await getFullnamesModel()

        if(response.error) return next(response)

        res.status(200).send({
            status: 200,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getFullnames
}