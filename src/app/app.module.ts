import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import Ajv from 'ajv';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { YuvBpmModule, YuvFrameworkModule } from '@yuuvis/framework';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [AppComponent, PreviewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    YuvFrameworkModule.forRoot({translations: ['assets/default/i18n/', 'assets/@yuuvis/i18n/']}),
    YuvBpmModule
  ],
  providers: [
    {
      provide: Ajv,
      useFactory: () => new Ajv(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
