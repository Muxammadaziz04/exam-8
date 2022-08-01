const { fetchData } = require('../utils/postgress')

const postCommentModel = async (user_id, comment_body, post_id) => {
    try {
        const postCommentQuery = `insert into comments (user_id, comment_body, post_id) values ($1, $2, $3) returning *`
        return await fetchData(postCommentQuery, user_id, comment_body, post_id)
    } catch (error) {
        console.log(error);
    }
}

const deleteCommentModel = async (comment_id, user_id) => {
    try {
        const deleteCommetnQuery = 'delete from comments where comment_id = $1 and user_id = $2 returning *'

        return await fetchData(deleteCommetnQuery, comment_id, user_id)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    postCommentModel, deleteCommentModel
}