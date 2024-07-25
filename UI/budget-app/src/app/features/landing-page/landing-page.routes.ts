import { Route } from '@angular/router';

export const landingRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./landing-page.component').then((mod) => mod.LandingPageComponent),
    children: [
      {
        path: '', loadComponent: () =>
        import('../laytout/laytout.component').then(
          (mod) => mod.LaytoutComponent
        )
      },
      {
          path: 'user-profile', loadComponent: () =>
          import('../user-profile/user-profile.component').then(
            (mod) => mod.UserProfileComponent
          )
      }
    ]
  }
      
];
