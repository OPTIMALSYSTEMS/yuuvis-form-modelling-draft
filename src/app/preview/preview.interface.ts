import { Model } from "src/types/form-model.type";
import { TaskOutcome } from "src/types/task-form.type";

export interface PreviewInput {
    model: Model;
    outcomes: TaskOutcome[]
}