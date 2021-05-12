import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
});

Route.post('/auth/login', 'AuthController.login');
Route.post('/auth/logout', 'AuthController.logout').middleware('auth');

Route.post('/users', 'UsersController.createUser');
Route.get('/users/me', 'UsersController.getCurrentUserInfo').middleware('auth');
