const { getCategoriesModel } = require("../models/categories.model");
const jwt = require("../utils/jwt");

const getCategories = async (req, res, next) => {
    try {
        const response = await getCategoriesModel()

        if(response.error || !response.length) return next(response)

        res.status(201).send({
            status: 201,
            message: 'successful created comment',
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCategories
}