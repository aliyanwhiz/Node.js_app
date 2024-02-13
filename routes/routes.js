const express  = require('express')
const session = require('express-session') 
const router = express.Router();
const multer = require("multer");
const users = require('../models/users');

// uplaoding image using multer
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./assets/userImages')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now+"_"+file.originalname)
    },
})
let upload = multer({
    storage: storage,
}).single('image')

// route to insert user
router.post('/add', upload,(req, res) => {
    const user = new users({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    })
    user.save()
    .then(result => {
        res.json({
            message: err.message,
            type: "danger"
        })
    })
    .catch(err => {
        req.session.message = {
                type : "success",
                message : "User added successfully"
            }
            res.redirect('/')
        });
})

router.get('/', (req, res) => {
    users.find()
        .then(users => {
            res.render('index', {
                title: "Home Page",
                message: req.session.message,
                users: users
            });
        })
        .catch(err => {
            res.json({
                message: err.message
            });
        });
});

router.get('/add', (req, res) => {
    res.render('add-user',{title : "add user Page"})
})

// adding edit route
router.get('/edit/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let user = await users.findById(id);
        if (user == null) {
            res.redirect('/');
        } else {
            res.render('edit-user', {
                title: 'Edit User',
                user: user,
            });
        }
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

module.exports = router