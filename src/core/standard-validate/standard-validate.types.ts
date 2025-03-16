import type { StandardSchemaV1 } from "better-auth";
import * as yup from "yup";

export type StandardValidate = <T extends StandardSchemaV1 | yup.Schema>(
  schema: T,
  // @ts-expect-error yup.InferInput<T> is not compatible with StandardSchemaV1.InferInput<T>
  input: StandardSchemaV1.InferInput<T>,
) => Promise<unknown>;

export type YupStandardSchema<Y extends yup.Schema> = Y & {
  "~standard": {
    version: 1;
    vendor: "yup";
    validate: (value: unknown) =>
      | { value: yup.InferType<Y> }
      | {
          issues: ReadonlyArray<{
            message: string;
            path?: ReadonlyArray<PropertyKey>;
          }>;
        };
    types: {
      input: yup.Asserts<Y>;
      output: yup.InferType<Y>;
    };
  };
};

export type StandardSchema = StandardSchemaV1 | yup.Schema;
