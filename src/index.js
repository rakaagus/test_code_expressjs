require('dotenv').config();
const express = require('express');
const session = require('express-session')
const { secretKey } = require('./config/database')

const PORT = process.env.PORT || 5000
const cors = require("cors")

const app = express()
app.use(cors())


// app.use(session({
//     secret: secretKey,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));

//routes
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')

//app router
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)


app.use((err, req, res, next) => {
    res.status(500).send({
        message: "Internal Server Error",
        success: false,
        serverMessage: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})