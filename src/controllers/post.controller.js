const path = require('path')
const { createPostModel, singlePostModel, cancelPostModel, confirmPostModel, getPostsModel, getPendingPostsModel, getCanceledPostsModel, searchPostsModel } = require('../models/post.model')
const jwt = require('../utils/jwt')

const post = async(req, res, next) => {
    try {
        let imgName = Date.now() + req.files?.img.name.replace(/\s/g, '')
        imgName = imgName.toString()
        const imgPath = path.join(__dirname, '../', 'uploads', imgName)
        const imgLink = `http://localhost:5000/uploads/${imgName}`
        
        const response = await createPostModel(req.body, imgLink)
        
        if(response?.error || !response.length) return next(response)
        
        req.files.img.mv(imgPath)
       
        res.status(201).send({
            status: 201,
            message: 'successful created',
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const getPosts = async (req, res, next) => {
    try {
        const {limit, date, title, subcategory, type, fullname} = req.query

        const response = date || type || title || subcategory || fullname ? (
            await searchPostsModel(date, subcategory, type, fullname) 
        ): await getPostsModel(limit)

        if(response.error) return next(response)

        res.status(200).send({
            status: 200,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const getPendingPosts = async (req, res, next) => {
    try {
        const response = await getPendingPostsModel()

        if(response.error) return next(response)

        res.status(200).send({
            status: 200,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const getCanceledPosts = async (req, res, next) => {
    try {
        const response = await getCanceledPostsModel()

        if(response.error) return next(response)

        res.status(200).send({
            status: 200,
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const confirmPost = async (req, res) => {
    try {
        const {post_id} = req.params

        const response = await confirmPostModel(post_id)

        res.send({
            status: 203,
            message: response[0] ? 'successful confired' : ''
        })
    } catch (error) {
        console.log(error);
    }
}

const cancelPost = async (req, res) => {
    try {
        const {post_id} = req.params

        const response = await cancelPostModel(post_id)

        res.send({
            status: 203,
            message: response[0] ? 'successful canceled' : ''
        })
    } catch (error) {
        console.log(error);
    }
}


const getSinglePost = async (req, res, next) => {
    try {
        const {post_id} = req.params

        const response = await singlePostModel(post_id)

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
    post, 
    getSinglePost, 
    cancelPost, 
    confirmPost, 
    getPosts, 
    getPendingPosts, 
    getCanceledPosts
}