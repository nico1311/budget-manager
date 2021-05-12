import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';

export default class AuthController {
  public async login(ctx: HttpContextContract) {
    const { auth, request } = ctx;
    const loginPayloadSchema = schema.create({
      email: schema.string({ trim: true}),
      password: schema.string()
    });

    const { email, password } = await request.validate({schema: loginPayloadSchema});
    await auth.use('web').attempt(email, password);

    return { success: true };
  }

  public async logout(ctx: HttpContextContract) {
    const { auth } = ctx;

    await auth.use('web').logout();

    return { success: true };
  }


}
