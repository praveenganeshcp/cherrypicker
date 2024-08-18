import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './modules/auth/store/effects';
import { provideStore, StoreModule } from '@ngrx/store';
import { authReducer } from './modules/auth/store/reducer';
import { HttpClientModule } from '@angular/common/http';
import { cherrypickRequestsDashboardReducer } from "./modules/request-manager/store/reducer";
import { CherrypickRequestsDashboardEffects } from './modules/request-manager/store/effects';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { environment } from '../environments/environment.dev';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore(),
    importProvidersFrom([
      EffectsModule.forRoot([AuthEffects, CherrypickRequestsDashboardEffects]),
      StoreModule.forRoot({
        userProfile: authReducer,
        dashboard: cherrypickRequestsDashboardReducer
      }),
      HttpClientModule,
      StoreDevtoolsModule.instrument(),
      BrowserAnimationsModule
    ]), provideAnimationsAsync(),
    {
      provide: 'API_URL',
      useValue: environment.apiUrl
    }
  ],
};
