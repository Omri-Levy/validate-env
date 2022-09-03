import { ZodFormattedError } from 'zod';

export const formatErrors = (
	errors: ZodFormattedError<Map<string, string>, string>,
): Array<string | undefined> =>
	Object.entries(errors)
		.map(([name, value]) => {
			if (!(`_errors` in value)) return;

			return `${name}: ${value._errors.join(`, `)}\n`;
		})
		.filter(Boolean);
