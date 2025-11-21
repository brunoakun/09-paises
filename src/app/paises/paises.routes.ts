import { Routes } from '@angular/router';
import { PaisLayout } from './layouts/pais-layout/pais-layout';

export const paisesRoutes: Routes = [
  {
    path: '',
    component: PaisLayout,
    children: [
      {
        path: 'por-capital',
        loadComponent: () => import('./pages/por-capital-page/por-capital-page').then(m => m.PorCapitalPage)
      },
      {
        path: 'por-pais',
        loadComponent: () => import('./pages/por-pais-page/por-pais-page').then(m => m.PorPaisPage)
      },
      {
        path: ':iso',
        loadComponent: () => import('./pages/pais-page/pais-page').then(m => m.PaisPage)
      },
      {
        path: 'por-region',
        loadComponent: () => import('./pages/por-region-page/por-region-page').then(m => m.PorRegionPage)
      },
      {
        path: '**',
        redirectTo: 'por-capital'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]
