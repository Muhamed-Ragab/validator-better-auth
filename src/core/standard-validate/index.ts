import type { StandardSchemaV1 } from "better-auth";
import { Schema, ValidationError } from "yup";

import type {
  StandardValidate,
  YupStandardSchema,
} from "./standard-validate.types";

export const standardValidate: StandardValidate = async (schema, input) => {
  const mappedSchema: StandardSchemaV1 =
    schema instanceof Schema ? standardizeYup(schema) : schema;

  const result = await mappedSchema["~standard"].validate(input);

  if ("issues" in result) {
    return Promise.reject(new Error(JSON.stringify(result.issues, null, 2)));
  }

  return result.value;
};

function standardizeYup<S extends Schema>(
  yupSchema: S,
  vendor = "validator-better-auth",
): StandardSchemaV1<YupStandardSchema<S>> {
  return {
    "~standard": {
      version: 1,
      vendor,
      async validate(value: unknown) {
        try {
          const validatedValue = await yupSchema.validate(value);

          return { value: validatedValue };
        } catch (err) {
          if (!(err instanceof ValidationError)) {
            throw err;
          }

          const issues =
            err.inner && err.inner.length > 0
              ? err.inner.map((issue: ValidationError) => ({
                  message: issue.message,
                  path: issue.path != null ? [issue.path] : undefined,
                }))
              : [
                  {
                    message: err.message || "Validation failed",
                    path: err.path != null ? [err.path] : undefined,
                  },
                ];

          return { issues };
        }
      },
      types: {
        input: null as unknown as StandardSchemaV1.InferInput<
          YupStandardSchema<Schema>
        >,
        output: null as unknown as StandardSchemaV1.InferOutput<
          YupStandardSchema<Schema>
        >,
      },
    },
  };
}
