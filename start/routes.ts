import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/auth/login', 'AuthController.login');
Route.post('/api/auth/logout', 'AuthController.logout').middleware('auth');

Route.post('/api/users', 'UsersController.createUser');
Route.get('/api/users/me', 'UsersController.getCurrentUserInfo').middleware('auth');

Route.post('/api/transactions', 'TransactionsController.createTransaction').middleware('auth');
Route.get('/api/transactions', 'TransactionsController.listTransactions').middleware('auth');
Route.get('/api/transactions/:id', 'TransactionsController.getTransaction').middleware('auth');
Route.patch('/api/transactions/:id', 'TransactionsController.editTransaction').middleware('auth');
Route.delete('/api/transactions/:id', 'TransactionsController.deleteTransaction').middleware('auth');

Route.get('*', (ctx) => {
  // Ugly workaround to handle frontend routes. I should probably have used nginx.
  ctx.response.download('./frontend/dist/index.html');
});
