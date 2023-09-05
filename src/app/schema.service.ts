import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import Ajv from 'ajv';
import { ValidationResponse } from './schema.interface';

@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  private _schema?: any;

  constructor(protected ajv: Ajv, private http: HttpClient) {}

  validateModel(model: any): Observable<ValidationResponse> {
    return this._fetchSchema().pipe(
      map((schema) => {
        const isValid = this.ajv.validate(schema, model);
        return {
          isValid,
          errors: this.ajv.errors as any,
        };
      })
    );
  }

  private _fetchSchema(): Observable<any> {
    return !this._schema
      ? this.http.get('assets/schema.json').pipe(
          tap((res) => {
            this._schema = res;
          })
        )
      : of(this._schema);
  }

  _fetchDemoModel(): Observable<any> {
    return this.http.get('assets/test-model.json');
  }
}
