import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../entities/User';

@ValidatorConstraint({ async: true })
class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  validate(email: string): Promise<boolean> | boolean {
    return User.findOne({ where: { email } }).then((user) => !user);
  }
}

export const IsEmailUnique = (options?: ValidationOptions) => (
  object: Object, // eslint-disable-line @typescript-eslint/ban-types
  propertyName: string
): void =>
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: {
      ...options,
      message: 'Email address is already in use.',
    },
    constraints: [],
    validator: IsEmailUniqueConstraint,
  });
