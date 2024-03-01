import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';




const routes: Routes = [
    { path: '', children:[
        {path:'login', component:LoginComponent},
        {path:'**', redirectTo:'login'}
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
