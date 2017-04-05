/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var md5 = require('md5');

module.exports = {
	attributes: {
		email: 			{ type: 'email', required: true, unique: true },
		name: 			{ type: 'string', required: true },
		username: 		{ type: 'string', required: true, unique: true },
		password: 		{ type: 'string', required: true },
		dob: 			{ type: 'string', defaultsTo: '' },
		gender: 		{ type: 'string', defaultsTo: '' },
		country: 		{ type: 'string', defaultsTo: '' },
		image: 			{ type: 'string', defaultsTo: '' },
		fbid: 			{ type: 'string' },
		game_bids: 		{ type: 'integer', defaultsTo: 0 },
		jackpot: 		{ model: 'Jackpot', defaultsTo: 0 },
		forgot_token: 	{ type: 'string', defaultsTo: '' },
		notification: 	{ type: 'integer', defaultsTo: 1 },
		device_id: 		{ type: 'string', defaultsTo: '' },

		toJSON: function() {
			var obj = this.toObject();
	      	delete obj.password;
	      	delete obj.createdAt
	      	delete obj.updatedAt;
	      	return obj;
		},

		battleWon: {
			collection: 'battle',
			via: 'winner'
		},

		battleBid: {
			collection: 'BattleBid',
			via: 'user'
		},

		myBattles: {
			collection: 'BattlePlayer',
			via: 'user'
		},

		jackpotBid: {
			collection: 'JackpotBid',
			via: 'user'
		},

		jakpotPlaying: {
			collection: 'JackpotPlayer',
			via: 'user'
		},

		myLongestJackpotBid: {
			collection: 'Jackpot',
			via: 'longest_bid_winner'
		},

		myMaxJackpotBid: {
			collection: 'Jackpot',
			via: 'max_bid_winner'
		},

		myStates: {
			collection: 'State',
			via: 'user'
		}
	},

	beforeCreate: function(obj, cb) {
		obj.password = md5(obj.password);
		cb();
	},

	validationMessages: { //hand for i18n & l10n
        email: {
            required: 'Email is required',
            email: 'Provide valid email address',
            unique: 'Email address is already taken',
            string: 'Email is required'
        },
        name: {
            required: 'Fullname is required',
            string: 'Fullname is required'
        },
        username: {
            required: 'User name is required',
            string: 'User name is required'
        },
        password: {
        	required: 'Password is required',
            string: 'Password is required'	
        }
    }
};

