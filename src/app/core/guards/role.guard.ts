import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/AuthService';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as string[];

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = authService.getRole();

  if (requiredRoles && !requiredRoles.includes(userRole ?? '')) {
    router.navigate(['/']);
    return false;
  }

  return true;
};