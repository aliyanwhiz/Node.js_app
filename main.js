// imports
require("dotenv").config()
const express = require("express")
const mongo = require("mongoose")
const session = require("express-session")

// instance and requirements
const app = express()
const PORT = process.env.PORT || 6000

//connection
mongo.connect(process.env.DB_URI)
const db = mongo.connection;
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('connection is established !'))

// middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false
}))
app.use((req, res, next) => {
    res.locals.massage = req.session.massage;
    delete req.session.massage;
    next();
})

// set templete engine
app.set("view engine", "ejs")

// methods
app.use('', require('./routes/routes'))


app.listen(PORT, () => console.log(`servere is running on http://localhost:${PORT}`))