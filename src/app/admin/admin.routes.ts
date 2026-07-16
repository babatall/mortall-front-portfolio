import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-layout/admin-layout').then(m => m.AdminLayout),
    children: [
      { path: '', redirectTo: 'projets', pathMatch: 'full' },
      {
        path: 'projets',
        loadComponent: () => import('./projets-admin/projets-admin').then(m => m.ProjetsAdmin)
      },
      {
        path: 'competences',
        loadComponent: () => import('./competences-admin/competences-admin').then(m => m.CompetencesAdmin)
      },
      {
        path: 'messages',
        loadComponent: () => import('./messages-admin/messages-admin').then(m => m.MessagesAdmin)
      }
    ]
  }
];