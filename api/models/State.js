/**
 * State.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		battle_wins: { type: 'integer', required: true },
		longest_battle_bid: { type: 'integer', defaultsTo: 0 },
		user: { model: 'user' }
	}
};

