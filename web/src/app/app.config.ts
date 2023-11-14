import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {TranslateModule} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptorService} from "./core/services/error-interceptor.service";
import {ConfigService} from "./core/services/config.service";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {InMemoryCache} from "@apollo/client/core";
import {HttpLink} from "apollo-angular/http";

export function configServiceFactory(config: ConfigService): () => Promise<boolean> {
  return (): Promise<boolean> => config.load();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(TranslateModule.forRoot({}), HttpClientModule, ApolloModule),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3000/newapp/checkin',
          }),
        };
      },
      deps: [HttpLink],
    }
  ]
};
