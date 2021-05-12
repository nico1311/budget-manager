import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersController {
  public async getCurrentUserInfo(ctx: HttpContextContract) {
    const { auth } = ctx;

    const user = auth.user!;

    return {
      id: user.id,
      email: user.email,
      name: user.name
    }
  }

  public async createUser(ctx: HttpContextContract) {
    const { auth } = ctx;

    if (auth.user) throw new Error('Cannot create a new user while authenticated')

    return { success: true }
  }

}
