import { CanActivateFn,Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import{inject} from '@angular/core'
import { AuthService } from './auth/services/auth.service';
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot) => {
    
    const authService=inject(AuthService);
    const router=inject(Router);
   
    
    if (authService.loggedIn()) {
      return true;
  }

  // Si el usuario no está autenticado, redirige a la página de inicio de sesión
  return router.createUrlTree(['/auth']);
}

