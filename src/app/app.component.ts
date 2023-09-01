import { Component } from '@angular/core';
import * as requestSchema from '../assets/schema.json';
import * as testModel from '../assets/test-model.json';
import Ajv from 'ajv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  validationError?: any;

  constructor(protected ajv: Ajv) {
    this.validate(requestSchema, testModel);
  }

  public validate(schema: any, data: any) {
    let isValid = false;
    try {
      isValid = this.ajv.validate(schema, data);
    }
    catch(e) {
console.log(e);

    }
    if (!isValid) {
      const errorMessages = this.ajv.errorsText();
      this.validationError = JSON.stringify(this.ajv.errors, null, 2);
      console.log(`Validation Error. ${errorMessages}`);
      // throw new Error(`Validation Error. ${errorMessages}`);
    }
    return data;
  }
}
