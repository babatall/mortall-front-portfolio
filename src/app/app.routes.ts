import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./public/home/home').then(m => m.Home)
  },
  {
    path: 'projets',
    loadComponent: () => import('./public/projets/projets').then(m => m.Projets)
  },
  {
    path: 'contact',
    loadComponent: () => import('./public/contact/contact').then(m => m.Contact)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.Login)
  },
  {
    path: 'admin',
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] },
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];