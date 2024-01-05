import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {AppComponent} from "./app.component";
import {DocumentComponent} from "./document/document.component";
import {DocumentService} from "./service/document.service";
import {DocumentItemComponent} from "./document-item/document-item.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppComponent,
    DocumentComponent,
    DocumentItemComponent,
  ],
  providers: [ DocumentService ],
})
export class AppModule { }
