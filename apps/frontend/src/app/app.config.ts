import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './modules/auth/store/effects';
import { provideStore, StoreModule } from '@ngrx/store';
import { authReducer } from './modules/auth/store/reducer';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore(),
    importProvidersFrom([
      EffectsModule.forRoot([AuthEffects]),
      StoreModule.forRoot({
        userProfile: authReducer,
      }),
      HttpClientModule,
      StoreDevtoolsModule.instrument(),
      BrowserAnimationsModule
    ]), provideAnimationsAsync()
  ],
};
