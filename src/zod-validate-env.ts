import {SomeZodObject, z, ZodFormattedError} from "zod";

export const zodValidateEnv = <TSchema extends SomeZodObject>({
																 schema,
																 onError,
																 format = (
																	 error,
																 ) => Object.entries(error)
																	 .map(([name, value]) => {
																		 if (!(`_errors` in value)) return;

																		 return `${name}: ${value._errors.join(`, `)}\n`;
																	 }).filter((v): v is string => typeof v === `string`),
																 log = console.error,
																 message = `❌ Invalid environment variables:\n`
															 }: {
	schema: TSchema,
	onError?: (message: string, errors: string[]) => void,
	format?: (errors: ZodFormattedError<Map<string, string>, string>) => string[],
	log?: (...messages: string[]) => void,
	message?: string
}): z.infer<TSchema> => {
	const result = schema.safeParse(process.env);

	if (!result.success) {
		const formatted = format(result.error.format());

		log(message, ...formatted);
		onError?.(message, formatted);

		throw new Error(message);
	};

	return result.data;
}
