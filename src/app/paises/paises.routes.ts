import { Routes } from '@angular/router';
import { PorCapitalPage } from './pages/por-capital-page/por-capital-page';
import { PaisLayout } from './layouts/pais-layout/pais-layout';

export const paisesRoutes: Routes = [
  {
    path: '',
    component: PaisLayout,
    children: [
      {
        path: 'por-capital',
        component: PorCapitalPage
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
