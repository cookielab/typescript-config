import type z from "zod";
import { compilerOptions } from "./compilerOptions";
import type { jsonSchemaForTheTypeScriptCompilerSConfigurationFileSchema as tsConfigSchema } from "./generated/configuration";

const configuration = {
	compilerOptions: compilerOptions,
} as const satisfies z.infer<typeof tsConfigSchema>;

export { configuration };
