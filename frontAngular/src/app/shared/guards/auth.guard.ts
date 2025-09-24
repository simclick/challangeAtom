import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;

  // si no hay sesión -> redirige al login y conserva returnUrl
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
