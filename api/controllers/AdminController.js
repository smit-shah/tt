/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	front_faq: function(req, res) {
		return res.view({ layout: '' });
	},

	front_terms: function(req, res) {
		return res.view({ layout: '' });
	},

	login: function(req, res) {
		if (req.method.toLowerCase() == 'post') {
			var email = req.param('email'),
				pass = req.param('password');
		}
		else
			return res.view({ layout: '' });
	}
	
};

