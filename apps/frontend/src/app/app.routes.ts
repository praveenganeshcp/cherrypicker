import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./modules/landing-page/components/landing-page.component').then(c => c.LandingPageComponent)
    },
    {
        path: 'github/authorize/callback',
        loadComponent: () => import("./modules/auth/components/oauth-callback.component").then(c => c.OauthCallbackComponent)
    },
    
];
