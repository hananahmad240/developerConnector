const express = require('express');
const gravatar = require('gravatar');
const User = require('../../db/models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const valiadateRegister = require('../../validations/register');
const valiadateLogin = require('../../validations/login');
const {
	json
} = require('body-parser');
// create route
const route = express.Router();
// ----------------------------------------------/api/users--------------------------------------------------

// 1
// POST /register
// public
route.post('/register', async (req, res) => {
	const {
		errors,
		isValid
	} = valiadateRegister(req.body);
	if (!isValid) {
		return res.status(400).json({
			errors
		});
	} else {
		const {
			name,
			email,
			password
		} = req.body;
		try {
			const user = await User.findOne({
				email,
			});
			// if email is already exits
			if (user) {
				errors.email = 'email is already exits';
				return res.status(400).json({
					errors: errors,
				});
			} else {
				const avatar = gravatar.url(email, {
					s: '200',
					r: 'pg',
					d: 'mm',
				});
				const obj = {
					name: name,
					email: email,
					password: password,
					avatar: avatar,
				};
				const salt = await bcryptjs.genSalt(10);
				obj.password = await bcryptjs.hash(password, salt);
				// console.log(obj);

				const newUser = await User.create(obj);
				return res.status(200).json({
					success: true,
					data: newUser,
				});
			}
		} catch (err) {
			return res.status(400).json({
				errors: 'error',
			});
		}
	}
});




// 2
// POST /login
// public

route.post('/login', async (req, res) => {
	const {
		errors,
		isValid
	} = valiadateLogin(req.body);
	if (!isValid) {
		return res.status(400).json({
			errors
		});
	} else {
		const {
			email,
			password
		} = req.body;
		try {
			const user = await User.findOne({
				email
			});
			// if user email does not exits
			if (!user) {
				errors.email = 'user email does not exits';
				return res.status(400).json({
					errors: errors
				});
			} else {
				// match password
				const isMatch = await bcryptjs.compare(password, user.password);
				if (!isMatch) {
					errors.password = 'password does not match'
					return res.status(400).json({
						errors: errors
					});
				} else {
					// jsonwebtoken
					const token = jwt.sign({
						id: user._id
					}, process.env.SECRET, {
						expiresIn: 3600
					});
					return res.status(200).json({
						data: user,
						token: `Bearer ${token}`
					});
				}
			}
		} catch (err) {
			return res.status(400).json({
				errors: err
			});
		}
	}
})



// 3
// GET /current
// private
route.get('/current', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	res.send(req.user);
})

// 4
// GET user by id
// private
route.get('/:id', (req, res) => {
	User.findById(req.params.id).then((user) => {
			return res.status(200).json({
				user
			})
		})
		.catch((err) => {
			return res.status(400).json({
				err
			})
		})
})
module.exports = route;