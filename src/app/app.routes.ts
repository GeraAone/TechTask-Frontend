import { Routes } from '@angular/router';
import {DocumentItemComponent} from "./document-item/document-item.component";
import {DocumentComponent} from "./document/document.component";

export const routes: Routes =
  [
    {
      path:'', redirectTo:'/documents', pathMatch:'full'
    },
    {
      path:'documents',
      component:DocumentComponent
    },
    {
      path:'documents/:id/items',
      component:DocumentItemComponent
    },
  ];
