const tsj = require("ts-json-schema-generator");
const path = require("path");
const fs = require("fs");

const config = {
    path: path.join(__dirname, "../src/types/form-model.type.ts"),
    tsconfig: path.join(__dirname, "../tsconfig.json"),
    type: "Model",
};

const schema_path = path.join(__dirname, "../src/assets/schema.json");

function writeSchema(schema) {
    const schemaString = JSON.stringify(schema, null, 2);
    fs.writeFileSync(schema_path, schemaString);
}

function generateSchema() {
    return tsj.createGenerator(config).createSchema(config.type);
}

function main() {
    const output = generateSchema();

    writeSchema(output);
}

main();