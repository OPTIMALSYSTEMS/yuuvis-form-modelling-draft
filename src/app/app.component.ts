import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { SchemaService } from './schema.service';
import { ValidationResponse } from './schema.interface';
import { TaskOutcome } from 'src/types/task-form.type';
import { PreviewInput } from './preview/preview.interface';

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
  private _strOutcomes?: string;
  set strOutcomes(m: any) {
    this._strOutcomes = m;
    this._outcomes = JSON.parse(m);
  }
  get strOutcomes() {
    return this._strOutcomes;
  }

  private _outcomes: TaskOutcome[] = [];
  set outcomes(m: any) {
    this._outcomes = m;
    this.strOutcomes = JSON.stringify(m, null, 2);
  }
  get outcomes() {
    return this._outcomes;
  }
  // outcomes: {outcomes: TaskOutcome[]} = {outcomes: []};

  previewInput?: PreviewInput;
  setPreviewInput(): void {
    this.previewInput = {
      model: { ...this.model },
      outcomes: [...(this._outcomes || [])],
    };
  }

  editorOptions = { theme: 'vs-dark', language: 'json' };
  editorOptions2 = { theme: 'vs-dark', language: 'json' };
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

        this.outcomes = [
          {
            name: 'OUTCOME 0',
            variable: 'status',
            value: 'close',
          },
          {
            name: 'OUTCOME 1',
            secondary: true,
            variable: 'status',
            value: 'open',
            model: {
              name: 'outcome_form',
              elements: [
                {
                  name: 'core',
                  type: 'o2mGroup',
                  elements: [
                    {
                      type: 'o2mGroup',
                      elements: [
                        {
                          name: 'appClient:clienttitle',
                          type: 'string',
                          maxLength: 200,
                          required: false,
                          cardinality: 'single',
                          rows: 1,
                          readonly: false,
                          label: 'Name',
                          description: '07 Invoice Management',
                        },
                        {
                          name: 'appClient:clientdescription',
                          type: 'string',
                          maxLength: 200,
                          required: false,
                          cardinality: 'single',
                          rows: 1,
                          readonly: false,
                          label: 'Description',
                        },
                      ],
                      layout: {
                        align: 'column',
                      },
                    },
                  ],
                  layout: {
                    align: 'row',
                  },
                },
                {
                  name: 'data',
                  type: 'o2mGroupStack',
                  elements: [],
                },
              ],
            },
          },
        ];
      },
    });
  }

  public validate() {
    this.schemaService.validateModel(this.model).subscribe({
      next: (res) => {
        this.validationRes = res;
        this.validationErrors = res?.errors
          ? JSON.stringify(res.errors, null, 2)
          : undefined;
      },
    });
  }
}
