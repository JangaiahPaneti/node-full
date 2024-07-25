import { Routes } from '@angular/router';
import { authGuard } from './common/guards/auth.guard';

export const routes: Routes = [
    {
        path: '', loadChildren: () =>
        import('./features/landing-page/landing-page.routes').then(
          (mod) => mod.landingRoutes
        ),
        canActivate: [authGuard]
    },
    {
        path: 'register', loadComponent: () =>
        import('./features/register/register.component').then(
          (mod) => mod.RegisterComponent
        )
    },
    {
        path: 'login', loadComponent: () =>
        import('./features/login/login.component').then(
          (mod) => mod.LoginComponent
        )
    },
    {
        path: '**', loadComponent: () =>
        import('./features/page-not-found/page-not-found.component').then(
          (mod) => mod.PageNotFoundComponent
        )
    }
];
