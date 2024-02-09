const express  = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index',{title : "Home Page"})
})

router.get('/add', (req, res) => {
    res.render('add-user',{title : "add user Page"})
})

module.exports = router