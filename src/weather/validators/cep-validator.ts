import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCepConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const cepRegex = /^\d{5}-?\d{3}$/;
    return cepRegex.test(value);
  }

  defaultMessage(): string {
    return `O valor do campo CEP não é um CEP válido`;
  }
}

export function IsCep(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: any, propertyName: string | symbol) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [],
      validator: IsCepConstraint,
    });
  };
}
