import { Routes } from '@angular/router';
import { TestLayout } from './layout/layout';

export const testRoutes: Routes = [
  {
    path: '',
    component: TestLayout,
    children: [
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]
