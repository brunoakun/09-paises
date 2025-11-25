import { Routes } from '@angular/router';
import { HomePage } from './shared/pages/home-page/home-page';

export const routes: Routes = [

  {
    path: '',
    component: HomePage
  },
  {
    path: 'paises',
    loadChildren: () =>
      import('./paises/paises.routes').then(m => m.paisesRoutes)
  },
  {
    path: 'test',
    loadChildren: () =>
      import('./test/test.routes').then(m => m.testRoutes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
