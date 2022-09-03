# Credit to packages used in this project

- zod - https://github.com/colinhacks/zod

### Description

A thin wrapper around zod's safeParse which expects a schema that describes the expected env vars and their types, passes process.env into safeParse.
On error: pretty prints the validation errors and throws an error.
On success: returns a typesafe version of process.env.

#### Install zod-validate-env

```bash
npm install zod-validate-env
yarn add zod-validate-env
pnpm add zod-validate-env
```

#### Example usage

```typescript
// Don't forget to use something like dotenv!
import { z } from 'zod';
import { zodValidateEnv } from 'zod-validate-env';

const schema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']),
	DATABASE_URL: z.string().url(),
});

const env = zodValidateEnv({
	schema,
	// Optional, here you could use something like Sentry.
	onError: (message, errors) => {
      // ...  
	},
	// Optional, defaults to console.error.
	log: console.log,
	// Optional, defaults to mapping over errors and using join on the _errors property.
	// safeParse's error.format() is passed in into format.
	format: (errors) => {
        // ...
	},
	// Optional, defaults to '❌ Invalid environment variables:\n'.
	message: 'Failed to validate env vars',
});

// Typesafe version of process.env
console.log(env.NODE_ENV);
```
