import type { StandardSchemaV1 } from "better-auth";
import type { Asserts, InferType, Schema } from "yup";

export type StandardValidate = <T extends StandardSchemaV1 | Schema>(
	schema: T,
	// @ts-expect-error yup.InferInput<T> is not compatible with StandardSchemaV1.InferInput<T>
	input: StandardSchemaV1.InferInput<T>,
) => Promise<unknown>;

export type YupStandardSchema<Y extends Schema> = Y & {
	"~standard": {
		version: 1;
		vendor: "yup";
		validate: (value: unknown) =>
			| { value: InferType<Y> }
			| {
					issues: ReadonlyArray<{
						message: string;
						path?: ReadonlyArray<PropertyKey>;
					}>;
			  };
		types: {
			input: Asserts<Y>;
			output: InferType<Y>;
		};
	};
};

export type StandardSchema = StandardSchemaV1 | Schema;
