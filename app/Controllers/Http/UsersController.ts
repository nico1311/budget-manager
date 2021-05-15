import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Database from '@ioc:Adonis/Lucid/Database';
import User from 'App/Models/User';

export default class UsersController {
  public async getCurrentUserInfo(ctx: HttpContextContract) {
    const { auth } = ctx,
      user = auth.user!;

    let balance = 0;

    const balanceQuery = await Database.from('user_balances')
      .select('balance').where('user_id', user.id)
      .first();

    if (balanceQuery && balanceQuery.balance) balance = balanceQuery.balance;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      balance: balance
    }
  }

  public async createUser(ctx: HttpContextContract) {
    const { auth, request, response } = ctx;

    const createUserPayloadSchema = schema.create({
      name: schema.string({trim: true}),
      email: schema.string({trim: true}, [
        rules.email(),
        rules.unique({
          table: 'users',
          column: 'email',
          caseInsensitive: true
        })
      ]),
      password: schema.string({}, [
        rules.confirmed()
      ])
    });

    const userDetails = await request.validate({schema: createUserPayloadSchema});
    const user = await User.create(userDetails);

    await auth.use('web').login(user);

    response.status(201).send({
      id: user.id,
      email: user.email,
      name: user.name
    });
  }

}
