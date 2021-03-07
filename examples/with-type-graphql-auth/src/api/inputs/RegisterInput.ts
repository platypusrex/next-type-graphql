import { Field, InputType } from 'type-graphql';
import { IsEmail, Length, MinLength } from 'class-validator';
import { IsEmailUnique } from '../decorators/isEmailUnique';
import { User } from '../entities/User';

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailUnique()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}
