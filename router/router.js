const express = require('express');
const router = express.Router();
module.exports = router;
const userModel = require('../model/model').userModel;


router.post('/register', (req, res) => {
    console.log('POST IS WORKING!');
    if (req.body.data) {
        const user = userModel({
            firstname: req.body.data.firstname,
            lastname: req.body.data.surname,
            email: req.body.data.email,
            password: req.body.data.password
        });
        user.save((err, result) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.message
                });
            } else if (result) {
                res.status(201).send({ success: true, message: "Data added successfully", result });
            }
        });
    } else {
        res.status(400).json({
            message: 'Please Enter any DATA!'
        });
    }
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    var password = req.body.password;

    userModel.findOne({ email: req.body.data.user.email }, function (err, userInfo) {

        if (err) {
            next(err);
        } if (userInfo) {
            if (req.body.data.user.password, userInfo.password) {
                // const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                res.json({ success: true, message: "user found!!!", data: { user: userInfo } });
            } else {
                res.json({ success: false, message: "Invalid email/password!!!" });
            }
        }
        if (!userInfo) {
            res.json({ success: false, message: "Invalid email/password!!!" });
        }


    });
});