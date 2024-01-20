import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Check if user is logged in
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isAuthenticated()) {
    return true;
  }

  // If not, redirect to login page
  router.navigate(['/login']);
  return false;
};
