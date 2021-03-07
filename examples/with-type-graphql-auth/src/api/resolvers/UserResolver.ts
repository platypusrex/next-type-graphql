import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entities/User';
import { RegisterInput } from '../inputs/RegisterInput';
import { LoginInput } from '../inputs/LoginInput';
import { hashPassword, validatePassword } from '../utils/authUtils';
import { Context } from '../types';

@Resolver(User)
export class UserResolver {
  @Query(() => [User], { nullable: true })
  async users(
    @Arg('confirmed', { defaultValue: false }) confirmed: boolean,
    @Ctx() ctx: Context
  ): Promise<User[] | null> {
    const userId = ctx.req.session.userId;
    if (!userId) {
      return null;
    }
    return User.find({ where: { confirmed } });
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    const userId = ctx.req.session.userId;
    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);
    if (!user) {
      return null;
    }

    return user;
  }

  @Mutation(() => User)
  async register(@Arg('input') input: RegisterInput, @Ctx() ctx: Context): Promise<User> {
    const { password, ...rest } = input;
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      password: hashedPassword,
      ...rest,
    }).save();

    ctx.req.session.userId = user.id;
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async login(@Arg('input') input: LoginInput, @Ctx() ctx: Context): Promise<User | null> {
    const { email, password } = input;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const passwordValid = await validatePassword(password, user.password);
    if (!passwordValid) {
      return null;
    }

    ctx.req.session.userId = user.id;
    return user;
  }
}
