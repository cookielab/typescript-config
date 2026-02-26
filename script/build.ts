import * as fs from "node:fs";
import * as fsAsync from "node:fs/promises";
import * as path from "node:path";
import * as process from "node:process";
import { parseArgs } from "node:util";
import { configuration } from "../src";
import { parsePath, run } from "./common";

const clearDirectory = async (directory: path.ParsedPath): Promise<void> => {
	const files = await fsAsync.readdir(path.format(directory));

	await Promise.all(files.map((file) => fsAsync.unlink(path.join(path.format(directory), file))));
};

const writeFile = async (directory: path.ParsedPath, name: string, content: Record<string, unknown>): Promise<void> => {
	const stringifiedContent = JSON.stringify(content);
	const filename = path.join(path.format(directory), name);

	await fsAsync.writeFile(filename, stringifiedContent, {
		encoding: "utf8",
		flag: "w",
	});
};

const build = async (): Promise<void> => {
	const {
		values: { target },
	} = parseArgs({
		allowPositionals: true,
		args: process.argv,
		options: {
			target: {
				type: "string",
				default: "./dist",
			},
		},
	});

	const targetPath = parsePath(target);
	if (targetPath == null) {
		throw new Error(`The target path "${target}" is not a valid path!`);
	}

	if (!fs.existsSync(path.format(targetPath))) {
		await fsAsync.mkdir(path.format(targetPath), { recursive: true });
	}

	await clearDirectory(targetPath);

	await writeFile(targetPath, "tsconfig.json", configuration);
};

await run(build);
