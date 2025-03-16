# validator-better-auth

A plugin for [Better Auth](https://github.com/better-auth) that enables schema validation using [Zod](https://github.com/colinhacks/zod), [Yup](https://github.com/jquense/yup), and [Valibot](https://valibot.dev/), or any other schema validator. It simplifies input validation for authentication flows.

## Features

- **Supports Multiple Validators:** Use Zod, Yup, or Valibot or any other schema validator for schema validation.
- **Middleware Integration:** Easily integrates with Better Auth as a validation plugin.
- **Type-Safe & Error Handling:** Provides structured validation error messages.

## Installation

```bash
npm install validator-better-auth
# or
yarn add validator-better-auth
# or
pnpm add validator-better-auth
# or
bun add validator-better-auth
```

## Usage

### Using the Validator Middleware

Integrate the validator into Better Auth with schema validation for requests.

```typescript
import { betterAuth } from "better-auth";
import { validator } from "validator-better-auth";
import { z } from "zod";

// Define a Zod schema
const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(12),
});

// Register validator plugin
betterAuth({
  plugins: [
    validator({
      middlewares: [
        { path: "/sign-up/email", schemas: { body: signupSchema } },
      ],
    }),
  ],
});
```

## Testing Example

### Running Validation with Different Schema Validators

```typescript
import { betterAuth } from "better-auth";
import * as v from "valibot"; // 1.24 kB
import { describe, it } from "vitest";
import * as y from "yup";
import { z } from "zod";

import { validator } from "./validator";

describe("validator", () => {
  it("initializes without errors with Zod", () => {
    const signupSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(12),
    });

    betterAuth({
      plugins: [
        validator({
          middlewares: [
            { path: "/sign-up/email", schemas: { body: signupSchema } },
          ],
        }),
      ],
    });
  });

  it("initializes without errors with Yup", () => {
    const signupSchema = y.object().shape({
      name: y.string().required(),
      email: y.string().email().required(),
      password: y.string().min(12).required(),
    });

    betterAuth({
      plugins: [
        validator({
          middlewares: [
            { path: "/sign-up/email", schemas: { body: signupSchema } },
          ],
        }),
      ],
    });
  });

  it("initializes without errors with Valibot", () => {
    const signupSchema = v.object({
      name: v.string(),
      email: v.pipe(v.string(), v.email()),
      password: v.pipe(v.string(), v.minLength(12)),
    });

    betterAuth({
      plugins: [
        validator({
          middlewares: [
            { path: "/sign-up/email", schemas: { body: signupSchema } },
          ],
        }),
      ],
    });
  });
});
```

## File Structure

```markdown
. 📂 validator-better-auth
├── 📄 CHANGELOG.md
├── 📄 README.md
├── 📄 eslint.config.js
├── 📄 package.json
├── 📄 pnpm-lock.yaml
└── 📂 src/
└── 📂 core/
├── 📄 index.ts
└── 📂 standard-validate/
├── 📄 index.ts
├── 📄 standard-validate.test.ts
├── 📄 standard-validate.types.ts
├── 📄 validator.test.ts
├── 📄 validator.ts
├── 📄 validator.types.ts
├── 📄 index.ts
└── 📄 tsconfig.json
```

## Contributing

Contributions are welcome! Please check our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
