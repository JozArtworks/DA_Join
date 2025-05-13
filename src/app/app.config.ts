import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth'; /* Required to provide Firebase Authentication support */

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { environment } from './../environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        /* Provides routing for the application */
        provideRouter(routes),

        /* Initializes Firebase with environment-specific config */
        importProvidersFrom(provideFirebaseApp(() =>
            initializeApp(environment.firebase)
        )),

        /* Provides Firestore database access */
        importProvidersFrom(provideFirestore(() => getFirestore())),

        /* Provides Firebase Authentication (required for inject(Auth)) */
        importProvidersFrom(provideAuth(() => getAuth())), /* <-- REQUIRED for SignUpComponent */

        /* Enables animations (noop if disabled) */
        provideAnimationsAsync('noop'),
        provideAnimations(),

        /* Provides Angular Material Dialog globally */
        importProvidersFrom(MatDialogModule)

        /* NOTE: Nothing has been removed from the original setup */
    ]
};
