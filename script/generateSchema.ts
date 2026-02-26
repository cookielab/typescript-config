import * as fs from "node:fs";
import * as process from "node:process";
import { parseArgs } from "node:util";
import { compileFromFile } from "json-schema-to-typescript";
import { generate as generateZodSchema } from "ts-to-zod";
import { parsePath, run } from "./common";

const generateSchema = async (): Promise<void> => {
	const {
		values: { source, target },
	} = parseArgs({
		allowPositionals: true,
		args: process.argv,
		options: {
			source: {
				type: "string",
				default: "./src/tsconfig.schema.json",
			},
			target: {
				type: "string",
				default: "./src/generated/configuration.ts",
			},
		},
	});

	if (parsePath(source) == null) {
		throw new Error(`The "source" path of "${source}" for the schema JSON is not a valid path.`);
	}

	if (parsePath(target) == null) {
		throw new Error(`The "target" path of "${target}" for the TypeScript file is not a valid path.`);
	}

	const typeScriptTypes = await compileFromFile(source);

	const { getZodSchemasFile } = generateZodSchema({
		keepComments: true,
		sourceText: typeScriptTypes,
	});

	const schema = getZodSchemasFile(".");

	fs.writeFileSync(target, schema);
};

await run(generateSchema);
