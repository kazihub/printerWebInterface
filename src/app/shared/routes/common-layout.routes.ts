import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'card-design',
    loadChildren: () => import('../../card-design/card-design.module').then(m => m.CardDesignModule)
  },
  {
    path: 'db-mapper',
    loadChildren: () => import('../../db-mapper/db-mapper.module').then(m => m.DbMapperModule)
  }
];
