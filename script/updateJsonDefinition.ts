import * as fs from "node:fs";
import * as fsAsync from "node:fs/promises";
import * as path from "node:path";
import * as process from "node:process";
import { parseArgs } from "node:util";
import { parsePath, run } from "./common";

const SCHEMA_URL = "https://json.schemastore.org/tsconfig" as const;

const updateJsonDefinition = async (): Promise<void> => {
	const {
		values: { target },
	} = parseArgs({
		allowPositionals: true,
		args: process.argv,

		options: {
			target: {
				type: "string",
				default: "./src/tsconfig.schema.json",
			},
		},
	});

	if (parsePath(target) == null) {
		throw new Error(`The "target" path of "${target}" for the schema JSON is not a valid path.`);
	}

	if (!fs.existsSync(path.dirname(target))) {
		await fsAsync.mkdir(path.dirname(target), { recursive: true });
	}

	try {
		const schemaResponse = await fetch(SCHEMA_URL);
		const configurationSchema = await schemaResponse.json();

		await fsAsync.writeFile(target, JSON.stringify(configurationSchema, undefined, 4), {
			encoding: "utf-8",
			flag: "w",
		});
	} catch (error: unknown) {
		// biome-ignore lint/suspicious/noConsole: No reason to setup a whole logger for a simple error display.
		console.error(error);

		throw new Error("Could not update the JSON definition due to an error. See the source error above.", {
			cause: error,
		});
	}
};

await run(updateJsonDefinition);
