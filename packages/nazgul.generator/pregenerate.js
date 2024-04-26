const { readFileSync, writeFileSync } = require("fs");

const path = process.argv[2];
console.log(path);

const tsconfig = readFileSync("./tsconfig.generate.json");
const content = JSON.parse(tsconfig.toString());
content.include = [path];

writeFileSync("./tsconfig.generate.json", JSON.stringify(content, undefined, 2));
