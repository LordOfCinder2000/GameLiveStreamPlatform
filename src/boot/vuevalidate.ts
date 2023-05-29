import useVuelidate from "@vuelidate/core";
export * from "@vuelidate/validators";
import { helpers } from "@vuelidate/validators";
export { useVuelidate };

export const regexVuelidate = (regex: RegExp, message: string) => {
	return helpers.withMessage(message, helpers.regex(regex));
};

export const atLeastOneDigit = helpers.withMessage(
	"Passwords must have at least one digit ('0'-'9')",
	helpers.regex(/\d/)
);

export const atLeastOneUppercase = helpers.withMessage(
	"Passwords must have at least one uppercase ('A'-'Z')",
	helpers.regex(/[A-Z]/)
);

export const atLeastOneLowercase = helpers.withMessage(
	"Passwords must have at least one lowercase ('a'-'z')",
	helpers.regex(/[a-z]/)
);

export const atLeastOneNonAlphanumericCharacter = helpers.withMessage(
	"Passwords must have at least one non alphanumeric character",
	helpers.regex(/\W/)
);

export const nonWhitespaces = helpers.withMessage(
	"Value must not contain white-spaces",
	helpers.regex(/^\S*$/)
);
