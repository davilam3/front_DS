import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  /* ============================= */
  /* PUBLIC */
  /* ============================= */

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
    path: 'perfil/:username',
    loadComponent: () =>
      import('./features/programmers/profile/profile-view')
        .then(m => m.ProfileViewComponent)
  },

  /* ============================= */
  /* ADMIN (LAYOUT PERSISTENTE) */
  /* ============================= */

  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_ADMIN' },
    loadComponent: () =>
      import('./features/admin/admin-layout/admin-layout')
        .then(m => m.AdminLayoutComponent),

    children: [

      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/admin/user/user-list')
            .then(m => m.UserListComponent)
      },

      {
        path: 'programadores',
        loadComponent: () =>
          import('./features/admin/programmers/programmer-list/programmer-list')
            .then(m => m.ProgrammerListComponent)
      },

      {
        path: 'disponibilidad',
        loadComponent: () =>
          import('./features/admin/availability/availability')
            .then(m => m.AvailabilityComponent)
      },

      {
        path: 'asesorias',
        loadComponent: () =>
          import('./features/admin/appointments/appointments')
            .then(m => m.AdminAppointmentsComponent)
      },

      {
        path: '',
        redirectTo: 'usuarios',
        pathMatch: 'full'
      }

    ]
  },

  /* ============================= */
  /* PROGRAMADOR (LAYOUT PROPIO) */
  /* ============================= */
  {
    path: 'programmer',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_PROGRAMMER' },
    loadComponent: () =>
      import('./features/programmers/programmer-layout/programmer-layout')
        .then(m => m.ProgrammerLayoutComponent),
    children: [
      {
        path: 'perfil',
        loadComponent: () =>
          import('./features/programmers/profile/profile-view')
            .then(m => m.ProfileViewComponent)
      },
      {
        path: 'editar-perfil',
        loadComponent: () =>
          import('./features/programmers/profile-edit/profile-edit')
            .then(m => m.ProfileEditComponent)
      },
      {
        path: 'asesorias',
        loadComponent: () =>
          import('./features/programmers/appointments/programmer-appointments')
            .then(m => m.ProgrammerAppointmentsComponent)
      },
      { path: '', redirectTo: 'perfil', pathMatch: 'full' }
    ]
  },


  /* ============================= */
  /* USUARIO LOGEADO */
  /* ============================= */

  {
    path: 'asesorias/nueva/:programmerId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/agendar-asesorias/agendar-asesoria')
        .then(m => m.AgendarAsesoriaComponent)
  },

  /* ============================= */
  /* FALLBACK */
  /* ============================= */

  {
    path: '**',
    redirectTo: ''
  }

];
