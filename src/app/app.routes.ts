import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'dynamic-form',
    loadComponent: () =>
      import('./pages/dynamic-form/dynamic-form.page').then(
        (m) => m.DynamicFormPage
      ),
  },
];
