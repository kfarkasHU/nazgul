import { join } from "path";
import {
    cpSync,
    existsSync,
    readFileSync,
    rmSync,
    writeFileSync
} from "fs";
import { exec } from "child_process";

const cwd = process.cwd();
const configPath = toAbsolute(process.argv[2] || "nazgul.config.json");
const defaultConfig = {
    tsconfigPath: "tsconfig.json",
    entry: 'src/index.ts',
    entryDist: 'index.js',
    outDir: '.nazgul'
}

let config = defaultConfig;
if (existsSync(configPath)) {
    const rawConfig = readFileSync(configPath).toString();
    try {
        config = JSON.parse(rawConfig);
    } catch {
        console.warn("There was an error while reading `nazgul.config.json`");
    }
} else {
    console.warn("No `nazgul.config.json` file was found!");
}

const configuration = {
    tsconfigPath: config.tsconfigPath || defaultConfig.tsconfigPath,
    entry: config.entry || defaultConfig.entry,
    outDir: config.outDir || defaultConfig.outDir,
    entryDist: config.entryDist || defaultConfig.entryDist,
}

const tsconfigAbsolute = toAbsolute(configuration.tsconfigPath);
const entryAbsolute = toAbsolute(configuration.entry);
const outDirAbsolute = toAbsolute(configuration.outDir);

const nazgulTsconfigPath = toAbsolute("temp-tsconfig.nazgul.json");

if (existsSync(nazgulTsconfigPath)) {
    rmSync(nazgulTsconfigPath);
}

cpSync(tsconfigAbsolute, nazgulTsconfigPath);

const rawNazgulTsconfig = readFileSync(nazgulTsconfigPath).toString();
const nazgulTsconfig = JSON.parse(rawNazgulTsconfig);

if (!nazgulTsconfig.compilerOptions) {
    nazgulTsconfig.compilerOptions = {};
}

if (!nazgulTsconfig.include) {
    nazgulTsconfig.include = [];
}

if (!nazgulTsconfig.compilerOptions.plugins) {
    nazgulTsconfig.compilerOptions.plugins = [];
}

nazgulTsconfig.compilerOptions.outDir = outDirAbsolute;
nazgulTsconfig.include.push(entryAbsolute);
nazgulTsconfig.compilerOptions.plugins.push({
    "transform": "typescript-rtti/dist/transformer"
});

writeFileSync(nazgulTsconfigPath, JSON.stringify(nazgulTsconfig, undefined, 2));

const commandsToExectute = [
    "ts-patch install -s",
    `ttsc -p ${nazgulTsconfigPath}`
];

async function buildAndGenerate(): Promise<void> {
    for (const commandToExectute of commandsToExectute) {
        const promise = new Promise(function(resolve, reject) {
            exec(toExecutable(commandToExectute), (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(undefined);
            });
        });
        await promise;
    }

    const runCommand = `node ${outDirAbsolute}/${configuration.entryDist}`;
    const runner = exec(runCommand, (error, stdout, stderr) => {
        error && !error.killed && console.log(error);
        stdout && console.log(stdout);
        stderr && console.log(stderr);
    });
    const sleep = new Promise((resolve) => setTimeout(() => resolve(undefined), 2_000));        // TODO: Make the timeout configurable
    await sleep;
    runner.kill('SIGTERM');

    rmSync(outDirAbsolute, { recursive: true });
    rmSync(nazgulTsconfigPath);
}

buildAndGenerate();


function toExecutable(command: string): string {
    return `npx ${command}`;
}

function toAbsolute(path: string): string {
    return join(cwd, path);
}
