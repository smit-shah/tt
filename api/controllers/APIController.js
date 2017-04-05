/**
 * APIController
 *
 * @description :: Server-side logic for managing APIS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var md5 = require('md5');

module.exports = {

	login: function(req, res) {
		var email = req.param('email'),
			password = req.param('password');

		if (!email)
			return res.json({ status: 'Fail', message: 'Email or Username can not be blank!', data: {} });

		if (!password)
			return res.json({ status: 'Fail', message: 'Password can not be blank!', data: {} });

		User.findOne().where({ or: [ { email: email} , { username: email } ] }).where({password: md5(password) }).exec(function(err, user){
			if (!user) {
				return res.json({ status: 'Fail', message: 'Not able to do login', data: {} });
			}
			else {
				return res.json({ status: 'Sucess', message: 'User logged in', data: user });
			}
		});
	},

	register: function(req, res) {
		var user_data = {
			name: req.param('name'),
			email: req.param('email'),
			password: req.param('password'),
			username: req.param('username'),
			dob: req.param('dob'),
			gender: req.param('gender'),
			device_id: req.param('device_id'),
			country: req.param('country')
		};

		User.create(user_data).exec(function(err, user){
			if (err && err.Errors) {

				if (err.Errors.email)
					return res.json({status: 'Fail', message: err.Errors.email[0].message, data: {} });

				if (err.Errors.username)
					return res.json({status: 'Fail', message: err.Errors.username[0].message, data: {} });
				
				if (err.Errors.name)
					return res.json({ status: 'Fail', message: err.Errors.name[0].message, data: {} });

				if (err.Errors.password)
					return res.json({ status: 'Fail', message: err.Errors.password[0].message, data: {} });

				console.log(err.Errors);
			}
			else {
				req.file('image').upload({dirname: require('path').resolve(sails.config.appPath, 'assets/images')}, function (err, uploadedImage){
					if (uploadedImage.length < 1) {
						return res.json({ status: 'Sucess', message: 'User registerd successfully!', data: user });
					}
					else {
						var name = require('path').basename(uploadedImage[0].fd);
						var protocol = req.connection.encrypted?'https':'http';
						var baseUrl = protocol + '://' + req.headers.host + '/image/';
						User.update({ id: user.id }, { image: baseUrl + name }).exec(function(er, u){
							return res.json({ status: 'Sucess', message: 'User registerd successfully!', data: u });
						});
					}
				});
			}
		});
	},

	home: function(req, res) {
		var user_id = req.param('user_id');

		if (!user_id)
			return res.json({ status: 'Fail', message: 'User is can not be blank!', data: {} })

		Jackpot.find().populate('playing', { where: { id: user_id }, limit: 1 }).populate('bids', { sort: 'id DESC', limit: 1 }).exec(function(err, userGame){
			if (userGame && userGame[0].playing.length == 0) {
				Jackpot.find().where({ can_join: 1 }).limit(1).sort('id ASC').exec(function(e, game){
					var channel_name = 'game_' + game[0]['id'];
					User.update({ id: user_id }, { jackpot: game[0]['id'] }).exec(function(){
						sails.sockets.join(req, channel_name, function(){
							return res.json({ status: 'Sucess', message: 'Game found!', data: game[0] });
						});
					});
				});
			}
			else { // We have found one game in user account
				Jackpot.findOne(userGame[0].id).exec(function(err, jack){
					console.log(jack);
				});
				var channel_name = 'game_' + userGame[0].id;
				console.log(userGame);
				sails.sockets.join(req, channel_name, function(){
					//This will give you list of socket of test channel
					/*sails.io.sockets.in('test').clients(function(data, u){
						console.log(u);
					});*/

					//Send to all members of test channel
					/*sails.io.in('test').emit('msg', { that: 'is great!' })*/
					return res.json({ status: 'Sucess', message: 'Game found!', data: userGame[0] });
				});
			}
		});
	},

	add_game_bid: function(req, res) {

	},

	test: function(req, res) {
		console.log('Test');
		req.socket.emit('msg', { hello: 'world' });
		return res.json({ name: 'test' });
	}
	
};

