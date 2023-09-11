# BPM form modeling
When using the BPM engine you can create form models to support users entering the required data for a certain task. 

This is done by creating a form model that contains a form element for each BPM variable you'd like to present to the user. 

This project contains a [JSON-Schema](../../src/assets/schema.json) to validate your model against as well as [Typescript types](../../src/types/form-model.type.ts) if you prefer that.

Another feature you might add are outcomes. 



## The form model
Form models are JSON objects that set up the structure of your form. They contain layout elements like `groups` and `stacks` as well as the `form elements`.
### Groups and stacks
Groups and stacks are containers for layouting your form. Groups for example may contain other `groups`, `stacks` or `form elements`. Stacks on the other hand are only allowed to contain groups. Stacks are later on rendered as tabs where each child group represents the content of that tab.

### Form elements
Form elements are the "actual" inputs. Depending on their type the form will render different input elements like `input`, `textarea`, `checkbox` or more advanced custom components like date pickers. You can also specify restrictions (maxLength, minLength, regex, ...) to guide the user. They may also contain a description that will be rendered below the input.

## Outcomes