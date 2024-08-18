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
    {
        path: 'app',
        loadComponent: () => import("./modules/app-shell/components/app-shell/app-shell.component").then(c => c.AppShellComponent),
        children: [
            {
                path: 'cherrypick-requests',
                loadComponent: () => import("./modules/request-manager/components/cherrypick-requests-dashboard/cherrypick-requests-dashboard.component").then(c => c.CherrypickRequestsDashboardComponent)
            },
            {
                path: 'cherrypick-requests/new',
                loadComponent: () => import("./modules/request-manager/components/create-cherrypick-request/create-cherrypick-request.component").then(c => c.CreateCherrypickRequestComponent)
            },
            {
                path: 'cherrypick-requests/:requestId',
                loadComponent: () => import('./modules/request-manager/components/cherrypick-request-detail/cherrypick-request-detail.component').then(c => c.CherrypickRequestDetailComponent)
            },
            {
                path: 'cherrypick-requests/:requestId/approve',
                loadComponent: () => import('./modules/request-manager/components/approve-request/approve-request.component').then(c => c.ApproveRequestComponent)
            }
        ]
    }
];
