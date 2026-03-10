import type z from "zod";
import type { compilerOptionsSchema } from "./generated/configuration";

// The conversion from JSON Schema provides the type as Record<string, unknown> & CompilerOptions.
// Using this long definition, the actual type can be extracted.
type CompilerOptions = Omit<
	z.infer<ReturnType<typeof compilerOptionsSchema.def.left.def.right.required>>,
	// The following properties are available in the JSON schema but TypeScript either does not allow their usage in tsconfig.json or has removed them completely.
	"watch" | "watchFile" | "charset" | "fallbackPolling" | "watchDirectory" | "listFilesOnly"
>;

const typeCheckingOptions: Pick<
	CompilerOptions,
	| "allowUnreachableCode"
	| "allowUnusedLabels"
	| "alwaysStrict"
	| "exactOptionalPropertyTypes"
	| "noFallthroughCasesInSwitch"
	| "noImplicitAny"
	| "noImplicitOverride"
	| "noImplicitReturns"
	| "noImplicitThis"
	| "noPropertyAccessFromIndexSignature"
	| "noUncheckedIndexedAccess"
	| "noUnusedLocals"
	| "noUnusedParameters"
	| "strict"
	| "strictBindCallApply"
	| "strictBuiltinIteratorReturn"
	| "strictFunctionTypes"
	| "strictNullChecks"
	| "strictPropertyInitialization"
	| "useUnknownInCatchVariables"
> = {
	/**
	 * There is no point in including unreachable code in a codebase.
	 */
	allowUnreachableCode: false,
	/**
	 * Unused labels are more often than not just a syntactic issue.
	 */
	allowUnusedLabels: false,
	/**
	 * Forces every file to be parsed in the [ECMAScript strict mode](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Strict_mode).
	 */
	alwaysStrict: true,
	/**
	 * This rule disallows usage of `undefined` as a value for attributes defined with `?`.
	 *
	 * For many use-cases, this may be too strict. However, if an even stricter configuration is required, this option is recommended to be set to `true`.
	 */
	exactOptionalPropertyTypes: false,
	/**
	 * Fall-through cases in switch can be easily left in the code as a bug.
	 * If multiple branches share the same logic, `if-else` may be a better tool for the job.
	 */
	noFallthroughCasesInSwitch: true,
	/**
	 * `any` was a mistake. This configuration disallows any usage of `any`.
	 */
	noImplicitAny: true,
	/**
	 * This configuration aims to promote explicit over implicit behavior, thus this rule is enabled.
	 * Additionally, this rule should help when working with classes and overrides.
	 */
	noImplicitOverride: true,
	/**
	 * This configuration aims to promote explicit over implicit behavior, thus this rule is enabled.
	 * Additionally, this rule should help catch any bugs regarding forgotten code paths.
	 */
	noImplicitReturns: true,
	/**
	 * This configuration aims to promote explicit over implicit behavior, thus this rule is enabled.
	 * Additionally, this rule should help catch any bugs regarding closures.
	 */
	noImplicitThis: true,
	/**
	 * Any keys that are not explicitly defined should be treated defensively - there is no guarantee they may be present.
	 */
	noPropertyAccessFromIndexSignature: true,
	/**
	 * Accessing values that are not explicitly defined may mean they are not present at all. Such cases should be handled.
	 */
	noUncheckedIndexedAccess: true,
	/**
	 * Unused values should not be left around.
	 */
	noUnusedLocals: true,
	/**
	 * Unused values should not be left around.
	 */
	noUnusedParameters: true,
	/**
	 * Why else would we be setting this configuration up?
	 */
	strict: true,
	/**
	 * This rule enforces type checking of bind/call/apply.
	 */
	strictBindCallApply: true,
	/**
	 * This rule requires iterators to be explicitly typed.
	 */
	strictBuiltinIteratorReturn: true,
	/**
	 * This rule enforces strict typing of reassigned functions.
	 */
	strictFunctionTypes: true,
	/**
	 * Any possibly null or undefined values should be handled explicitly.
	 */
	strictNullChecks: true,
	/**
	 * All class values should be explicitly initialized once the constructor finishes.
	 */
	strictPropertyInitialization: true,
	/**
	 * This rule changes the type of the value in catch from `any` to `unknown`.
	 * Using `unknown` forces the handler to verify that the value is really an `Error`.
	 */
	useUnknownInCatchVariables: true,
} as const;

const moduleOptions: Pick<
	CompilerOptions,
	| "allowArbitraryExtensions"
	| "allowImportingTsExtensions"
	| "allowUmdGlobalAccess"
	| "baseUrl"
	| "customConditions"
	| "module"
	| "moduleResolution"
	| "moduleSuffixes"
	| "noResolve"
	| "noUncheckedSideEffectImports"
	| "paths"
	| "resolveJsonModule"
	| "resolvePackageJsonExports"
	| "resolvePackageJsonImports"
	| "rewriteRelativeImportExtensions"
	| "rootDir"
	| "rootDirs"
	| "typeRoots"
	| "types"
> = {
	/**
	 * Arbitrary extensions should use a declaration file.
	 *
	 * However, if the target project is using a bundler, this rule can be disabled.
	 */
	allowArbitraryExtensions: false,
	/**
	 * In most projects, importing with a specific extension is not needed.
	 *
	 * For the rare cases that need this functionality, this rule can be disabled.
	 */
	allowImportingTsExtensions: false,
	/**
	 * Explicit imports are always preferred over magic/implicit globals.
	 */
	allowUmdGlobalAccess: false,
	/**
	 * If this option needs to be set, it should be done by the consumer project.
	 */
	baseUrl: null,
	/**
	 * If this option needs to be set, it should be done by the consumer project.
	 */
	customConditions: null,
	/**
	 * ESNext is a good modern target.
	 *
	 * For the less common use-cases, this should be changed to a different appropriate value.
	 */
	module: "esnext",
	/**
	 * Most code these days is bundled in some way (vite, esbuild & others). `bundler` is thus selected as the default.
	 *
	 * For the cases that `bundler` is unfit, using `nodenext` is recommended. Other values are either deprecated or target Node versions older than v10.
	 */
	moduleResolution: "bundler",
	/**
	 * Rare configuration that only affects a few projects.
	 *
	 * Should be overridden by the consumer configuration.
	 */
	moduleSuffixes: null,
	/**
	 * This configuration disables the initial scan of directives such as `references`.
	 *
	 * Should only be overridden in the rare case it is actually not required.
	 */
	noResolve: false,
	/**
	 * This configuration helps with detecting unresolved imports.
	 */
	noUncheckedSideEffectImports: true,
	/**
	 * This configuration changes the import path for select locations.
	 *
	 * If required, this should be set by the consumer configuration.
	 */
	paths: null,
	/**
	 * This configuration allows importing JSON files with type checking.
	 */
	resolveJsonModule: true,
	/**
	 * This configuration is set to `true` by default when using `bundler` or `nodenext`.
	 */
	resolvePackageJsonExports: true,
	/**
	 * This configuration is set to `true` by default when using `bundler` or `nodenext`.
	 */
	resolvePackageJsonImports: true,
	/**
	 * The transformation from `.ts` to `.js` is handled by the bundler.
	 *
	 * If required, this should be enabled in the consumer configuration.
	 */
	rewriteRelativeImportExtensions: false,
	/**
	 * This configuration should be set by the consumer configuration.
	 */
	rootDir: null,
	/**
	 * This configuration should be set by the consumer configuration.
	 */
	rootDirs: null,
	/**
	 * If required, this configuration should be set by the consumer configuration.
	 */
	typeRoots: null,
	/**
	 * If required, this configuration should be set by the consumer configuration.
	 */
	types: null,
} as const;

const emitOptions: Pick<
	CompilerOptions,
	| "declaration"
	| "declarationDir"
	| "declarationMap"
	| "downlevelIteration"
	| "emitBOM"
	| "emitDeclarationOnly"
	| "importHelpers"
	| "inlineSourceMap"
	| "inlineSources"
	| "mapRoot"
	| "newLine"
	| "noEmit"
	| "noEmitHelpers"
	| "noEmitOnError"
	| "outDir"
	| "outFile"
	| "preserveConstEnums"
	| "removeComments"
	| "sourceMap"
	| "sourceRoot"
	| "stripInternal"
> = {
	/**
	 * This setting is helpful when working on libraries or other bundled & shared code.
	 *
	 * If required, this option can be disabled by the consumer project.
	 */
	declaration: true,
	/**
	 * The declarations will life alongside the `.js` output.
	 *
	 * If required, this option can be changed by the consumer project.
	 */
	declarationDir: null,
	/**
	 * This setting provides a declaration map so that IDEs can find the source `.ts` file when referencing a construct from `.d.ts` files.
	 *
	 * If required, this option can be disabled by the consumer project. This is recommended for larger projects of >150 files.
	 */
	declarationMap: true,
	/**
	 * This option is only useful when transpiling to older versions of ECMAScript.
	 */
	downlevelIteration: false,
	/**
	 * This setting defaults to `false` anyway. However, requiring BOM to be emitted is very rare and thus the rule is disabled.
	 */

	// biome-ignore lint/style/useNamingConvention: TypeScript configuration naming we cannot do anything about.
	emitBOM: false,
	/**
	 * Setting this to `true` as the configuration expects `bundler` to be used.
	 *
	 * Should be changed to `false` if a bundler is not used.
	 */
	emitDeclarationOnly: true,
	/**
	 * This option is only useful when transpiling to older versions of ECMAScript.
	 */
	importHelpers: false,
	/**
	 * Sourcemaps should be only enabled by the consumer configuration.
	 */
	inlineSourceMap: false,
	/**
	 * Sources should be only enabled by the consumer configuration.
	 */
	inlineSources: false,
	/**
	 * Should be configured by the consumer configuration. This is usually not required.
	 */
	mapRoot: null,
	/**
	 * Using `lf` for wider compatibility (UNIX vs DOS).
	 *
	 * `lf` is the default value.
	 */
	newLine: "lf",
	/**
	 * As this configuration is using the `bundler` setting, the output is expected to be produced by a bundler.
	 */
	noEmit: true,
	/**
	 * This option is only useful when transpiling to older versions of ECMAScript.
	 */
	noEmitHelpers: null,
	/**
	 * This option defaults to `false`. However, with `noEmit` disabled, this should have no effect.
	 */
	noEmitOnError: false,
	/**
	 * Default the output do `dist` as to not accidentally generate output files into the source directory.
	 *
	 * If required, this should be changed by the consumer configuration.
	 */
	outDir: "dist",
	/**
	 * Disabled in favor of `outDir`.
	 */
	outFile: null,
	/**
	 * Disabled even though enums are forbidden by this configuration.
	 */
	preserveConstEnums: true,
	/**
	 * Comments should not be necessary in the production output.
	 */
	removeComments: true,
	/**
	 * Emitting a normal declaration map by default.
	 */
	sourceMap: true,
	/**
	 * If required, this should be set by the consumer configuration.
	 */
	sourceRoot: null,
	/**
	 * This setting would strip out anything tagged with `@internal` in JSDoc. This could lead to an invalid output.
	 */
	stripInternal: false,
} as const;

const javascriptSupportOptions: Pick<CompilerOptions, "allowJs" | "checkJs" | "maxNodeModuleJsDepth"> = {
	/**
	 * This setting should only be enabled if working with older dependencies that do not have a `.ts` version.
	 */
	allowJs: false,
	/**
	 * JavaScript code cannot be checked when `allowJs` is disabled.
	 */
	checkJs: false,
	/**
	 * Only useful when having `allowJs` enabled.
	 */
	maxNodeModuleJsDepth: null,
} as const;

const editorSupportOptions: Pick<CompilerOptions, "disableSizeLimit" | "plugins"> = {
	/**
	 * This setting is an older one and is thus left in the default state.
	 *
	 * If TypeScript encounters memory limits, it should be handled by the consumer configuration.
	 */
	disableSizeLimit: null,
	/**
	 * Plugins should be enabled by the consumer configuration.
	 */
	plugins: null,
} as const;

const interopConstraintsOptions: Pick<
	CompilerOptions,
	| "allowSyntheticDefaultImports"
	| "erasableSyntaxOnly"
	| "esModuleInterop"
	| "forceConsistentCasingInFileNames"
	| "isolatedDeclarations"
	| "isolatedModules"
	| "preserveSymlinks"
	| "verbatimModuleSyntax"
> = {
	/**
	 * When working with default exports, this configuration prefers them to be explicit. And the same goes for grouped imports.
	 */
	allowSyntheticDefaultImports: false,
	/**
	 * This setting disables the usage of:
	 * 1. `enum`
	 * 2. `namespace` and `module` with runtime code
	 * 3. Parameter properties in classes
	 * 4. Non-ECMAScript `import = ` and `export =`
	 * 5. `<prefix>`-style type assertions
	 *
	 * This means that the TypeScript code can be directly run with newer versions of NodeJS.
	 */
	erasableSyntaxOnly: true,
	/**
	 * Working with non-ES6 modules is not common these days. This setting can be disabled because of this.
	 *
	 * Enabling this setting would also enable `allowSyntheticDefaultImports`, which is not wanted.
	 */
	esModuleInterop: false,
	/**
	 * Forces the casing in filenames to be consistent.
	 */
	forceConsistentCasingInFileNames: true,
	/**
	 * Requires that the typing of functions using code from other files is explicitly typed. But only in cases where the type is not trivially extrapolated.
	 */
	isolatedDeclarations: false,
	/**
	 * Since this configuration relies on `bundler` usage, this setting would have no effect.
	 */
	isolatedModules: true,
	/**
	 * This setting enforces that a symlink resolves to the target file and not to the relative location.
	 */
	preserveSymlinks: false,
	/**
	 * This configuration ensures that any code imported with `import type` or `import { type }` gets dropped from the JS output.
	 */
	verbatimModuleSyntax: true,
} as const;

const backwardsCompatibilityOptions: Pick<
	CompilerOptions,
	| "importsNotUsedAsValues"
	| "keyofStringsOnly"
	| "noImplicitUseStrict"
	| "noStrictGenericChecks"
	| "out"
	| "preserveValueImports"
	| "suppressExcessPropertyErrors"
	| "suppressImplicitAnyIndexErrors"
> = {
	/**
	 * @deprecated in favor of `verbatimModuleSyntax`
	 */
	importsNotUsedAsValues: "remove",
	/**
	 * @deprecated to remove older behavior from TypeScript <2.9.
	 *
	 * Kept as `false` in line with the default.
	 */
	keyofStringsOnly: false,
	/**
	 * This setting is kept disabled as it is not needed in modern TypeScript.
	 */
	noImplicitUseStrict: null,
	/**
	 * Keeping this setting of to get keep the strict generic checks.
	 */
	noStrictGenericChecks: false,
	/**
	 * @deprecated in favor of `outDir` and `outFile`
	 */
	out: null,
	/**
	 * @deprecated in favor of `verbatimModuleSyntax`
	 */
	preserveValueImports: null,
	/**
	 * This setting should not be used in modern codebases.
	 */
	suppressExcessPropertyErrors: false,
	/**
	 * This setting should not be used in modern codebases.
	 */
	suppressImplicitAnyIndexErrors: false,
} as const;

const languageAndEnvironmentOptions: Pick<
	CompilerOptions,
	| "emitDecoratorMetadata"
	| "experimentalDecorators"
	| "jsx"
	| "jsxFactory"
	| "jsxFragmentFactory"
	| "jsxImportSource"
	| "lib"
	| "libReplacement"
	| "moduleDetection"
	| "noLib"
	| "reactNamespace"
	| "target"
	| "useDefineForClassFields"
> = {
	/**
	 * Enabling this setting to provide decorator metadata.
	 */
	emitDecoratorMetadata: true,
	/**
	 * Enabling this setting to provide decorator metadata.
	 */
	experimentalDecorators: true,
	/**
	 * If using `jsx`, the `react-jsx` value is the best default value.
	 *
	 * If required, this can be changed by the consumer configuration. For example with working with React Native.
	 */
	jsx: "react-jsx",
	/**
	 * This setting defaults to `React.createElement`.
	 *
	 * The setting should be changed in case the target JSX runtime requires it. For example in case of `preact`.
	 */
	jsxFactory: null,
	/**
	 * This setting defaults to `React.createElement`.
	 *
	 * The setting should be changed in case the target JSX runtime requires it. For example in case of `preact`.
	 */
	jsxFragmentFactory: null,
	/**
	 * Keeping `react` as the default value as it is the most common use-case.
	 *
	 * If required, this should be changed by the consumer configuration.
	 */
	jsxImportSource: "react",
	/**
	 * This setting is left to the consumer configuration.
	 */
	lib: null,
	/**
	 * This configuration is not used commonly.
	 *
	 * If required, it should be set by the consumer configuration.
	 */
	libReplacement: null,
	/**
	 * Leaving the module detection mechanism in the default `auto` mode.
	 */
	moduleDetection: "auto",
	/**
	 * This setting is legacy and does not seem to have much use in the modern TypeScript.
	 */
	noLib: false,
	/**
	 * @deprecated in favor of `jsxFactory`.
	 */
	reactNamespace: null,
	/**
	 * `esnext` is used as the default value since this configuration expects to be used in the `bundler` mode.
	 *
	 * If required, this target can be lowered or moved up by the consumer configuration.
	 */
	target: "esnext",
	/**
	 * This setting unifies the behavior from TypeScript and the final specification from TC39.
	 *
	 * This option may break already existing code, caution is advised. Newer & greenfield codebases should not be affected.
	 */
	useDefineForClassFields: true,
} as const;

const compilerDiagnosticsOptions: Pick<
	CompilerOptions,
	| "diagnostics"
	| "extendedDiagnostics"
	| "generateCpuProfile"
	| "listEmittedFiles"
	| "listFiles"
	| "noCheck"
	| "traceResolution"
> = {
	/**
	 * This configuration is used for TypeScript debugging. It is left in the default state in favor of `extendedDiagnostics`.
	 */
	diagnostics: null,
	/**
	 * This setting should only be enabled when debugging TypeScript compiler problems.
	 */
	extendedDiagnostics: null,
	/**
	 * This setting should only be enabled when debugging TypeScript compiler problems.
	 */
	generateCpuProfile: null,
	/**
	 * This setting should only be enabled when debugging TypeScript compiler problems.
	 */
	listEmittedFiles: null,
	/**
	 * This setting should only be enabled when debugging TypeScript compiler problems.
	 */
	listFiles: null,
	/**
	 * There is no reason to disable type checking. Only when debugging compiler problems.
	 */
	noCheck: false,
	/**
	 * This setting should only be enabled when debugging TypeScript compiler problems.
	 */
	traceResolution: null,
} as const;

const projectsOptions: Pick<
	CompilerOptions,
	| "composite"
	| "disableReferencedProjectLoad"
	| "disableSolutionSearching"
	| "disableSourceOfProjectReferenceRedirect"
	| "incremental"
	| "tsBuildInfoFile"
> = {
	/**
	 * This setting enables build-time optimizations. However, in modern scenarios, these may not be necessary.
	 */
	composite: false,
	/**
	 * This setting is only necessary when working with TypeScript projects that cannot fit into memory.
	 */
	disableReferencedProjectLoad: false,
	/**
	 * This setting only applies to `composite` projects.
	 */
	disableSolutionSearching: false,
	/**
	 * This setting only applies to `composite` projects.
	 */
	disableSourceOfProjectReferenceRedirect: false,
	/**
	 * This setting only applies to `composite` projects.
	 */
	incremental: false,
	/**
	 * This setting only applies to `composite` projects.
	 */
	tsBuildInfoFile: null,
} as const;

const outputFormattingOptions: Pick<CompilerOptions, "noErrorTruncation" | "preserveWatchOutput" | "pretty"> = {
	/**
	 * Makes the errors readable in full.
	 */
	noErrorTruncation: true,
	/**
	 * Makes the watch output cleaner, if used.
	 */
	preserveWatchOutput: false,
	/**
	 * Already enabled by default.
	 */
	pretty: true,
} as const;

const completenessOptions: Pick<CompilerOptions, "skipDefaultLibCheck" | "skipLibCheck"> = {
	/**
	 * @deprecated in favor of `skipLibCheck`
	 */
	skipDefaultLibCheck: null,
	/**
	 * Dependencies often do not adhere to the stricter setup of TypeScript. Any issues in dependencies should not be solved or handled by the consumers.
	 * In an ideal world, we would be able to enforce the stricter TypeScript setup globally.
	 */
	skipLibCheck: true,
} as const;

const watchOptions: Pick<CompilerOptions, "assumeChangesOnlyAffectDirectDependencies"> = {
	/**
	 * Watch mode will check all files for changes.
	 */
	assumeChangesOnlyAffectDirectDependencies: false,
} as const;

const compilerOptions = {
	...typeCheckingOptions,
	...moduleOptions,
	...emitOptions,
	...javascriptSupportOptions,
	...editorSupportOptions,
	...interopConstraintsOptions,
	...backwardsCompatibilityOptions,
	...languageAndEnvironmentOptions,
	...compilerDiagnosticsOptions,
	...projectsOptions,
	...outputFormattingOptions,
	...completenessOptions,
	...watchOptions,
} as const satisfies CompilerOptions;

export { compilerOptions };
