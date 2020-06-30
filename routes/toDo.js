const express = require('express');
const ToDo = require('../models/ToDO');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));


router.get('/', (req, res) => {
    res.send("we are on To Do");
});

router.post('/', (req,res) => {
    console.log(req.body);
    console.log("hello world");
    res.send(req.body);
});


module.exports = router;