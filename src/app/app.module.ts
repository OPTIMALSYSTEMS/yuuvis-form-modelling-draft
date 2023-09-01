import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import Ajv from 'ajv';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: Ajv,
      useFactory: () => new Ajv(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
