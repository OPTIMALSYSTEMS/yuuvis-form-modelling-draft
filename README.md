
## Form modelling in yuuvis

With his project you can validate your yuuvis form models. It also contains a type definition for those models that is used to generate a json schema. This JSON schema will be used to validate your model.

- Typescript types: `./src/types/form-model.type.ts`
- JSON schema: `./src/assets/schema.json`

## The validation app
Run `npm start` to start the validation app. In this app you can input you form model and validate it against the schema.json