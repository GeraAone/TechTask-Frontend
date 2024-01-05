import { ApplicationConfig } from '@angular/core';
import {ActivatedRoute, provideRouter} from '@angular/router';

import { routes } from './app.routes';
import {DocumentService} from "./service/document.service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), DocumentService, ActivatedRoute]
};
