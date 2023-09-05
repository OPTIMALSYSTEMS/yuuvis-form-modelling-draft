import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { SchemaService } from './schema.service';
import { ValidationResponse } from './schema.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _code?: string;
  set code(m: any) {
    this._code = m;
    this._model = JSON.parse(m);
  }
  get code() {
    return this._code;
  }

  editorOptions = { language: 'json' };
  validationRes?: ValidationResponse;
  validationErrors?: string;

  private _model?: any;
  set model(m: any) {
    this._model = m;
    this._code = JSON.stringify(m, null, 2);
  }
  get model() {
    return this._model;
  }

  constructor(private schemaService: SchemaService) {
    this.schemaService._fetchDemoModel().subscribe({
      next: (res) => {
        this.model = res;
      },
    });
  }

  public validate() {
    this.schemaService.validateModel(this.model).subscribe({
      next: (res) => {
        this.validationRes = res;        
        this.validationErrors = res?.errors ? JSON.stringify(res.errors, null, 2) : undefined;
      },
    });
  }
}
