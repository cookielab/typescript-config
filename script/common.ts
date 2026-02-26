import * as path from "node:path";
import * as process from "node:process";

const parsePath = (filePath: string): path.ParsedPath | null => {
	try {
		return path.parse(filePath);
	} catch {
		return null;
	}
};

const run = async (script: () => Promise<void>): Promise<void> => {
	try {
		await script();
	} catch (error: unknown) {
		// biome-ignore lint/suspicious/noConsole: No reason to setup a whole logger for a simple error display.
		console.error(error);
		// biome-ignore lint/suspicious/noConsole: No reason to setup a whole logger for a simple error display.
		console.error("The script failed with an error. See the message above for details.");

		process.exit(1);
	}
};

export { parsePath, run };
