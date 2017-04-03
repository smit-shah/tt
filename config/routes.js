module.exports.routes = {


  '/': 'AdminController.login',
  'get /faq': 'AdminController.front_faq',
  'get /terms': 'AdminController.front_terms',

  'post /api/user/login': 'APIController.login',
  'post /api/user/register': 'APIController.register',


  //Socket calls
  'post /api/home': 'APIController.home',
  'post /api/jackpot/new-bid': 'APIController.add_game_bid',
  'post /test': 'APIController.test'

};
