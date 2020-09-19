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
  },
  {
    path: 'settings',
    loadChildren: () => import('../../settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../../user-accounts/user-accounts.module').then(m => m.UserAccountsModule)
  },
  {
    path: 'approval-list',
    loadChildren: () => import('../../approval-list/approval-list.module').then(m => m.ApprovalListModule)
  },
  {
    path: 'reprint-request',
    loadChildren: () => import('../../reprint-request/reprint-request.module').then(m => m.ReprintRequestModule)
  },
  {
    path: 'spoilt-cards',
    loadChildren: () => import('../../spoilt-cards/spoilt-cards.module').then(m => m.SpoiltCardsModule)
  },
  {
    path: 'receipt-numbers',
    loadChildren: () => import('../../receipt-number/receipt-number.module').then(m => m.ReceiptNumberModule)
  }
];
