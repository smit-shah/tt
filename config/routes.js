module.exports.routes = {


  '/': 'AdminController.login',

  'post /api/user/login': 'APIController.login',
  'post /api/user/register': 'APIController.register',


  //Socket calls
  'post /api/home': 'APIController.home',
  'post /test': 'APIController.test'

};
