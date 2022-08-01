const jwt = require('../utils/jwt.js');
const { fetchData } = require('../utils/postgress.js')

const createPostModel = async ({ post_title, post_desc, post_text, post_date, post_time, post_category, post_subcategory, post_type, post_link, fullname, profession, phone_num, additional_phone_num }, post_img) => {
    try {
        const createPostQuery = `insert into posts 
        ( post_title, post_img, post_desc, post_text, post_date, post_time, post_category, post_subcategory, post_type, post_link, fullname, profession, phone_num, additional_phone_num) 
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *`
        return await fetchData(createPostQuery, post_title, post_img, post_desc, post_text, post_date, post_time, post_category, post_subcategory, post_type, post_link, fullname, profession, phone_num, additional_phone_num);
    } catch (error) {
        console.error(error);
    }
}

const getPostsModel = async (limit) => {
    try {
        const getPostsQuery = ` select * from posts where post_status = 'confired' ${limit ? `limit ${limit}` : ''}`;
        return await fetchData(getPostsQuery)
    } catch (error) {
        console.log(error);
    }
}

const getPendingPostsModel = async () => {
    try {
        const getPendingPostsQuery = ` select * from posts where post_status = 'pending'`;
        return await fetchData(getPendingPostsQuery)
    } catch (error) {
        console.log(error);
    }
}

const getCanceledPostsModel = async () => {
    try {
        const getCanceledPostsQuery = ` select * from posts where post_status = 'canceled'`;
        return await fetchData(getCanceledPostsQuery)
    } catch (error) {
        console.log(error);
    }
}

const confirmPostModel = async (post_id) => {
    try {
        const confirmPostQuery = `update posts set post_status = 'confired' where post_id = $1 returning *`
        return await fetchData(confirmPostQuery, post_id)
    } catch (error) {
        console.log(error);
    }
}

const cancelPostModel = async (post_id) => {
    try {
        const cancelPostQuery = `update posts set post_status = 'canceled' where post_id = $1 returning *`
        return await fetchData(cancelPostQuery, post_id)
    } catch (error) {
        console.log(error);
    }
}

const singlePostModel = async (post_id) => {
    try {
        const singlePostQuery = `
        select post.* 
            from (select p.*, json_agg(c) as comments from posts as p 
                left join (
                    select com.comment_id, com.comment_body, com.post_id, u.username from comments as com left join users as u on com.user_id = u.user_id
                ) as c 
            on p.post_id = c.post_id group by p.post_id) as post
        where post_id = $1 and post_status = 'confired';`

        return await fetchData(singlePostQuery, post_id)
    } catch (error) {
        console.log(error);
    }
}

const searchPostsModel = async (date, subcategory, type, fullname) => {
    try {
        let arr = [date, subcategory, type, fullname].filter(el => el != undefined)

        let queryParams = [
            `${date ? `post_date = $${arr.indexOf(date) + 1}` : ''}`,
            `${subcategory ? `post_subcategory = $${arr.indexOf(subcategory) + 1}` : ''}`,
            `${type ? `post_type = $${arr.indexOf(type) + 1}` : ''}`,
            `${fullname ? `fullname = $${arr.indexOf(fullname) + 1}` : ''}`
        ]
        queryParams = queryParams.filter(query => Boolean(query))
        const searchPostsQuery = `select * from posts where (${queryParams.join(' and ')}) and post_status = 'confired'`

        return await fetchData(searchPostsQuery, date, subcategory, type, fullname)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createPostModel,
    singlePostModel,
    cancelPostModel,
    confirmPostModel,
    getPostsModel,
    getPendingPostsModel,
    getCanceledPostsModel,
    searchPostsModel
}