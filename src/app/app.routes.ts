import type { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
      },
      {
        path: 'agenda',
        loadComponent: () => import('./pages/agenda/agenda').then(m => m.Agenda),
      },
      {
        path: 'tasks',
        loadComponent: () => import('./pages/tasks/tasks').then(m => m.Tasks),
      },
      {
        path: 'finanze',
        loadComponent: () => import('./pages/finanze/finanze').then(m => m.Finanze),
      },
      {
        path: 'documenti',
        loadComponent: () => import('./pages/documenti/documenti').then(m => m.Documenti),
      },
      {
        path: 'casa',
        loadComponent: () => import('./pages/casa/casa').then(m => m.Casa),
      },
      {
        path: 'cucina',
        loadComponent: () => import('./pages/cucina/cucina').then(m => m.Cucina),
      },
      {
        path: 'salute',
        loadComponent: () => import('./pages/salute/salute').then(m => m.Salute),
      },
      {
        path: 'archivio',
        loadComponent: () => import('./pages/archivio/archivio').then(m => m.Archivio),
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then(m => m.Settings),
      },
    ],
  },
];
