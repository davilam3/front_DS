import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./features/homePage/homePage')
        .then(m => m.HomePage)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page')
        .then(m => m.LoginPage)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register-page/register-page')
        .then(m => m.RegisterPage)
  },

  {
    path: 'perfil/:id',
    loadComponent: () =>
      import('./features/dashboard/perfil/perfil')
        .then(m => m.Perfil),
  },

  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_ADMIN' },
    loadComponent: () =>
      import('./features/admin-panel/admin-panel')
        .then(m => m.AdminPanel)
  },

  {
    path: 'programmer',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_PROGRAMMER' },
    loadComponent: () =>
      import('./features/programador-panel/programador-panel')
        .then(m => m.ProgramadorPanel)
  },

  {
    path: '**',
    redirectTo: ''
  }

];

