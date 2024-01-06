import { RouterModule, Routes } from '@angular/router';
import {DocumentItemComponent} from "./document-item/document-item.component";
import {DocumentComponent} from "./document/document.component";
import { NgModule } from '@angular/core';

export const routes: Routes =
  [
    { path: 'documents', component: DocumentComponent },
    {
      path:'documents/:id/items',
      component:DocumentItemComponent
    },
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
