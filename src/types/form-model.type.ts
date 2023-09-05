//The root form model
export interface Model {
  name: string;
  label?: string;
  script?: string;
  description?: string;
  situation: 'EDIT' | 'SEARCH' | 'CREATE';
  // elements on this level should contain two elements:
  // elements[0] = CoreSection
  // elements[1] = DataSection
  elements: [CoreSection, DataSection];
}

//
export interface CoreSection extends Group {
  name: 'core';
}

export interface DataSection extends Stack {
  name: 'data';
}

// Container used to layout form elements
export interface Group {
  name?: string;
  label?: string;
  type: 'o2mGroup';
  // Groups may contain other groups as well as stacks or form elements
  elements: (
    Group | 
    Stack | 
    FormElementBoolean |
    FormElementDatetime |
    FormElementDecimal |
    FormElementInteger |
    FormElementString |
    FormElementTable 
    )[];
  layout?: {
    align?: 'row' | 'column';
  };
}

// Container that could only contain group elements (will be rendered as tabs)
export interface Stack {
  name?: string;
  type: 'o2mGroupStack';
  elements: Group[];
}

// Abstract form element containing fields shared across all types
export interface FormElement {
  name: string;
  label?: string;
  // will be rendered below the input element
  description?: string;
  type: 'string' | 'integer' | 'decimal' | 'boolean' | 'table' | 'datetime';
  cardinality: 'single' | 'multi';
  classifications?: string[];
  required?: boolean;
  readonly?: boolean;
}

// Form element of type string
export interface FormElementString extends FormElement {
  type: 'string';
  defaultvalue?: string[] | string;
  maxLength?: number;
  minLength?: number;
  // number of row the text input should have (defines the size of the input/textarea)
  rows?: number;
  // in case of a catalog field this property holds the available options
  options?: string[] | string;
  regex?: string;
}

// Form element of type integer
export interface FormElementInteger extends FormElement {
  type: 'integer';
  defaultvalue?: number[] | number;
  // minimum value
  maxValue?: number;
  // maximum value
  minValue?: number;
  // Overall amount of digits allowed (including decimal places)
  precision?: number;
  // Set to true to group number by certain pattern (... provided by the pattern property)
  grouping?: boolean;
  // The pattern to group the value by
  pattern?: string;
}

// Form element of type decimal
export interface FormElementDecimal extends FormElement {
  type: 'decimal';
  defaultvalue?: number[] | number;
  // minimum value
  maxValue?: number;
  // maximum value
  minValue?: number;
  // Overall amount of digits allowed (including decimal places)
  precision?: number;
  // Number of decimal places
  scale?: number;
  // Set to true to group number by certain pattern (... provided by the pattern property)
  grouping?: boolean;
  // The pattern to group the value by
  pattern?: string;
}

// Form element of type boolean
export interface FormElementBoolean extends FormElement {
  type: 'boolean';
  defaultvalue?: boolean; 
  tristate?: boolean;
}

// Form element of type datetime
export interface FormElementDatetime extends FormElement {
  type: 'datetime';
  defaultvalue?: string[] | string; 
  // If resolutioon is set to 'date' time is not included
  resolution?: 'date';
}

// Form element of type table
export interface FormElementTable extends FormElement {
  type: 'table';
}
