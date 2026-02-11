import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data?.['role'];
  const userRole = authService.getUserRoles();

  if (!userRole) {
    router.navigate(['/login']);
    return false;
  }
  if (expectedRole && !userRole.includes(expectedRole)) {
    router.navigate(['/']);
    return false;
  }


  return true;
};
