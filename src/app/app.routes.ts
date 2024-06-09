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
  {
    path: 'dynamic-required',
    loadComponent: () =>
      import('./pages/dynamic-required/dynamic-required.page').then(
        (m) => m.DynamicRequiredPage
      ),
  },
  {
    path: 'assets-from',
    loadComponent: () => import('./pages/assets-from/assets-from.page').then( m => m.AssetsFromPage)
  },
];
