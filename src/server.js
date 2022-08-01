const express = require('express')
const path = require('path')
const fileupload = require('express-fileupload')
const cors = require('cors')

// const checkToken = require('./middlewares/checkToken.js')

const userRouter = require('./routers/user.router')
const commentsRouter = require('./routers/comment.router')
const postRouter = require('./routers/post.router')
const categoriesRouter = require('./routers/categories.router')
const fullnameRouter = require('./routers/fullnames.router')

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileupload())
app.use(express.static(path.join(__dirname)))
// app.use(checkToken)

app.use(userRouter)
app.use(commentsRouter)
app.use(postRouter)
app.use(categoriesRouter)
app.use(fullnameRouter)

app.use((error, req, res, next) => {
    return res.send({ error: error.error?.message || "somethink went wrong"})
})

app.listen(process.env.PORT || 5000, () => {
    console.log('server is run');
})