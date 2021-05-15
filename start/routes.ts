import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
});

Route.post('/auth/login', 'AuthController.login');
Route.post('/auth/logout', 'AuthController.logout').middleware('auth');

Route.post('/users', 'UsersController.createUser');
Route.get('/users/me', 'UsersController.getCurrentUserInfo').middleware('auth');

Route.post('/transactions', 'TransactionsController.createTransaction').middleware('auth');
Route.get('/transactions', 'TransactionsController.listTransactions').middleware('auth');
Route.get('/transactions/:id', 'TransactionsController.getTransaction').middleware('auth');
Route.patch('/transactions/:id', 'TransactionsController.editTransaction').middleware('auth');
Route.delete('/transactions/:id', 'TransactionsController.deleteTransaction').middleware('auth');
