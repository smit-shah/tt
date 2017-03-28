/**
 * Jackpot.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		jid: 				{ type: 'integer', required: true },
		title: 				{ type: 'string', required: true },
		amount: 			{ type: 'float', required: true },
		d_hours: 			{ type: 'integer', comments: 'Doomsday hours' },
		d_mins: 			{ type: 'integer' },
		d_secs: 			{ type: 'integer' },
		g_hours: 			{ type: 'integer' },
		g_mins: 			{ type: 'integer' },
		g_secs: 			{ type: 'integer' },
		d_end: 				{ type: 'datetime' },
		g_end: 				{ type: 'datetime' },
		increment: 			{ type: 'integer', defaultsTo: 0 },
		can_join: 			{ type: 'integer', defaultsTo: 1 },
		longest_bid_winner: { model: 'user' },
		max_bid_winner: 	{ model: 'user' },

		playing: {
			collection: 'User',
			via: 'jackpot'
		},

		battles: {
			collection: 'battle',
			via: 'jackpot'
		},

		bids: {
			collection: 'JackpotBid',
			via: 'jackpot'
		},

		players: {
			collection: 'JackpotBid',
			via: 'jackpot'
		}
	}
};

