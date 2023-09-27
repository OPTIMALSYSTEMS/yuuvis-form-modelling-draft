# Form modelling for BPM tasks

When using the BPM engine you can create form models to support users entering the required data for a certain task.

This is done by creating a form model that contains a form element for each BPM variable you'd like to present to the user.

This task form looks like this:

```js
{
    model: {...},   // the form model
    outcomes: [...] // custom actions definition
}
```

This project contains a [JSON-Schema](../../src/assets/schema.json) to validate your model against as well as [Typescript types](../../src/types/form-model.type.ts) if you prefer that.

Tasks do not require a form. By adding a form model, the action of finishing the task will be disabled until the provided form is valid.

## The form model

Form models are JSON objects that set up the structure of your form. They contain layout elements like `groups` and `stacks` as well as the `form elements`.

### Groups and stacks

Groups and stacks are containers for layouting your form. Groups for example may contain other `groups`, `stacks` or `form elements`. Stacks on the other hand are only allowed to contain groups. Stacks are later on rendered as tabs where each child group represents the content of that tab.

### Form elements

Form elements are the "actual" inputs. Depending on their type the form will render different input elements like `input`, `textarea`, `checkbox` or more advanced custom components like date pickers. You can also specify restrictions (maxLength, minLength, regex, ...) to guide the user. They may also contain a description that will be rendered below the input.

## Outcomes

Outcomes are custom actions defined by a task. If the task does not define outcomes, the default action will be `Confirm` which will complete the task.

Let's take a look on how such an outcome is defined:

```ts
{
    ...
    outcomes: [
        {
            // technical name (also used for translations. If no translation is found, this will be the label of the button)
            name: 'Approve';
            // Name of the variable that this outcome will write to process vars
            variable: 'approved';
            // The value that this outcome will write to process vars
            value: true;
            // Optional form model. 
            model: {...};
            // Outcomes will be rendered as primary buttons. If you want an outcome
            // to be less prominent you could set this property to 'true'
            secondary: true;
        }
    ]
}
```

So every outcome will be rendered as a button on that task. Clicking this button will set the variable defined in its definition to the given value and complete the task.

### Outcomes with forms
You can also specify a form model for an outcome. This model is the same as the model described above. Clicking such an outcome-button will render this form. The user can then enter the desired data and once the form is valid, submit it. The fields in that form will set their values to the process variables before finishing the task.


## Claimablility

If a task has no assignee the UI will force the user to claim the task before being able to work with it. Claiming a task will remove it from the inbox of other users that might has received it as well.
