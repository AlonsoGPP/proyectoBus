import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { RegistroChoferComponent } from './registro-chofer/registro-chofer.component';
import { MenuRegistroChoferComponent } from './menu-registro-chofer/menu-registro-chofer.component';
import { RegistroBusComponent } from './registro-bus/registro-bus.component';
import { MenuRegistroBusComponent } from './menu-registro-bus/menu-registro-bus.component';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { AsignacionItinerarioComponent } from './asignacion-itinerario/asignacion-itinerario.component';
import { MenuAsignacionChoferComponent } from './menu-asignacion-chofer/menu-asignacion-chofer.component';
import { VistaAsientosComponent } from './vista-asientos/vista-asientos.component';
import { rolGuard } from './rol.guard';





const routes: Routes = [
    { path: '',component:MainPageComponent, children:[
        {path:'registro-chofer', component:RegistroChoferComponent, canActivate:[rolGuard]},
        {path:'registro-bus',component:RegistroBusComponent,canActivate:[rolGuard]},
        {path:'registro-usuario', component:RegistroUsuariosComponent,canActivate:[rolGuard]},
        {path:'registro-itinerario', component:AsignacionItinerarioComponent},
        {path:'test',component:VistaAsientosComponent},
        {path:'registro-itinerario/asientos', component:VistaAsientosComponent},
        {path:'', redirectTo:'registro-itinerario', pathMatch:'full'}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
