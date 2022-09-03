import { envSchema } from './schema';
import { formatErrors } from './format-errors';

const result = envSchema.safeParse(process.env);

if (!result.success) {
	console.error(
		`❌ Invalid environment variables:\n`,
		...formatErrors(result.error.format()),
	);
	throw new Error(`Invalid environment variables`);
}

export const env = result.data;
