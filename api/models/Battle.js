/**
 * Battle.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		jackpot: { model: 'jackpot' },
		level: { type: 'integer' },
		title: { type: 'string' },
		bids: { type: 'integer' },
		hours: { type: 'integer' },
		mins: { type: 'integer' },
		secs: { type: 'integer' },
		end_on: { type: 'datetime' },
		winner: { model: 'user' },

		bids: {
			collection: 'BattleBid',
			via: 'battle'
		},

		players: {
			collection: 'BattlePlayer',
			via: 'battle'
		}
	}
};

