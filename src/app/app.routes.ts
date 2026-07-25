import type { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
  },
  {
    path: 'agenda',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/agenda/agenda').then(m => m.Agenda),
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/tasks/tasks').then(m => m.Tasks),
  },
  {
    path: 'finanze',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/finanze/finanze').then(m => m.Finanze),
  },
  {
    path: 'documenti',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/documenti/documenti').then(m => m.Documenti),
  },
  {
    path: 'casa',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/casa/casa').then(m => m.Casa),
  },
  {
    path: 'cucina',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/cucina/cucina').then(m => m.Cucina),
  },
  {
    path: 'salute',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/salute/salute').then(m => m.Salute),
  },
  {
    path: 'archivio',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/archivio/archivio').then(m => m.Archivio),
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/settings/settings').then(m => m.Settings),
  },
];
