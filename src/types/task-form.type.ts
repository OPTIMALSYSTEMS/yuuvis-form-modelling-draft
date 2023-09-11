import { Model } from './form-model.type';

export interface TaskForm {
  /**
   * IDs of properties definied in the yuuvis object type schema. The form then will be
   * created from those properties. If a model is provided, this will be ignored.
   *
   */
  schemaProperties?: string[];
  // Model object or string (ID to fetch a form model from the backend)
  model?: Model | string;
  // Data to be injected into the form (key is the propertys name)
  data?: { [propertyName: string]: any };
  // List of outcomes
  outcomes?: TaskOutcome[];
}

export interface TaskOutcome {
  // the outcomes technical name (also used for translations)
  name: string;
  // Name of the variable that this outcome will write to process vars
  variable: string;
  // The vaue that this outcome will write to process vars
  value: any;
  /**
   * Optional form model. Could be the model object as well as a string (ID
   * to fetch a form model from the backend).
   *
   * If you provide a model, triggering the outcome will display/render this form
   * alongside with the tasks form. Values of all rendered forms will be put into
   * the process variables
   */
  model?: any;
  /**
   * Outcomes will be rendered as primary buttons. If you want an outcome
   * to be less prominent you could set this property to 'true'
   */
  secondary?: boolean;
}
