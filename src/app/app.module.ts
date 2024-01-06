import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {AppComponent} from "./app.component";
import {DocumentComponent} from "./document/document.component";
import {DocumentService} from "./service/document.service";
import {DocumentItemComponent} from "./document-item/document-item.component";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentComponent,
    DocumentItemComponent,
    HttpClientModule,
    CommonModule, RouterOutlet, DocumentComponent, RouterLink,
    RouterModule.forRoot([]),

  ],
  providers: [ DocumentService ],
  bootstrap: [AppComponent],
})
export class AppModule { }
