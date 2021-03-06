import FrameworkValidator, {
    ValidationError as FrameworkValidationError,
    ValidationRule as FrameworkValidationRule,
    ValidationSchema as FrameworkValidationSchema,
} from "fastest-validator";
import {ApplicationErrorBase} from "./error";

export class Validator extends FrameworkValidator {
    validateOrThrow(object: any, schema: FrameworkValidationSchema) {
        const errors = this.validate(object, schema);
        if (errors !== true) {
            throw new ValidationError(errors);
        }

        return true;
    }

    validateOrInvoke(object: any, schema: FrameworkValidationSchema, next: (err: ValidationError) => any) {
        const errors = this.validate(object, schema);
        if (errors !== true) {
            next(new ValidationError(errors));
            return false;
        }

        return true;
    }
}

export class ValidationError extends ApplicationErrorBase {

    public readonly publics = ["name", "message", "status", "validationErrors"];
    public readonly validationErrors: FrameworkValidationError[];

    constructor(validationErrors: FrameworkValidationError[]) {
        super("ValidationError", "The provided entry could not be validated.", 422, undefined, undefined);
        this.validationErrors = validationErrors;
    }
}

const v = new Validator();
export default v;