const express = require('express');
const router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = router
const User =require('../model/model');


// router.post('/register', (req, res) => {
//     console.log('POST IS WORKING!');
//     if (req.body.data) {
//         const user = userModel({
//             firstname: req.body.data.firstname,
//             lastname: req.body.data.lastname,
//             email: req.body.data.email,
//             password: req.body.data.password
//         });
//         user.save((err, result) => {
//             if (err) {
//                 res.status(500).send({
//                     success: false,
//                     message: err.message
//                 });
//             } else if (result) {
//                 res.status(201).send({ success: true, message: "Data added successfully", result });
//             }
//         });
//     } else {
//         res.status(400).json({
//             message: 'Please Enter any DATA!'
//         });
//     }
// });
router.get('/', ensureAuthenticated, function(req, res){
	console.log('index');
});

//Authenticate API
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		// res.redirect('/users/login');
	}   
}

//Register API
router.post('/register', function (req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;   
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('firstname', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		//checking for email are already taken
		User.findOne({ email: { 
			"$regex": "^" + email + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: { 
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (user || mail) {
					res.render('register', {
						user: user,
						mail: mail
					});
				}
				else {
					var newUser = new User({
						firstname: firstname,
						lastname: lastname,
						email: email,
						password: password
					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						res.status(200).send(user);
					});
         	req.flash('success_msg', 'You are registered and can now login');
					//res.redirect('/users/login');
				}
			});
		});
	}
});

passport.use(new LocalStrategy(
	function (email, password, done) {
		User.getUserByUsername(email, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

router.post('/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/');
	});

router.get('/logout', function (req, res) {
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});


// router.post('/login', (req, res) => {
//     const email = req.body.email;
//     var password = req.body.password;

//     userModel.findOne({ email: req.body.user.email }, function (err, userInfo) {

//         if (err) {
//             next(err);
//         } if (userInfo) {
//             if (bcrypt.compareSync(req.body.data.user.password, userInfo.password)) {
//                 const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
//                 res.json({ success: true, message: "user found!!!", data: { user: userInfo, token: token } });
//             } else {
//                 res.json({ success: false, message: "Invalid email/password!!!" });
//             }
//         }
//         if (!userInfo) {
//             res.json({ success: false, message: "Invalid email/password!!!" });
//         }


//     });
// });

// //Card API
// router.post('/card', (res,req) => {
//     if (req.body.data) {
//         const user = userModel({
//              creditCard: req.body.data.creditCard,
//              debitCard: req.body.data.debitCard,
//         });
//         user.save((err, result) => {
//             if (err) {
//                 res.status(500).send({
//                     success: false,
//                     message: err.message
//                 });
//             } else if (result) {
//                 res.status(201).send({ success: true, message: "Data added successfully", result });
//             }
//         });
//     } else {
//         res.status(400).json({
//             message: 'Please Enter any DATA!'
//         });
        
//     }
// });