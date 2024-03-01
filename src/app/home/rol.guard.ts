import { CanActivateFn,Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import{inject} from '@angular/core'
import { AuthService } from '../auth/services/auth.service';
export const rolGuard: CanActivateFn = (route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot) => {
    
    const authService=inject(AuthService);
    const router=inject(Router);
    const auth=inject(AuthService);
    const rol=auth.getUserInfoFromToken()?.rol;
    const adminRoutes=['/home/registro-usuario','/home/registro-chofer','/home/registro-bus' ];
    console.log(state.url)
    if (authService.loggedIn() && rol==='admin' && adminRoutes.includes(state.url)) {
      return true;
  }

  // Si el usuario no está autenticado, redirige a la página de inicio de sesión
  return router.createUrlTree(['/home/registro-itinerario']);
}

