import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IUser } from 'src/app/shared/intefaces/IUser';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
})
export class LoginComponent {
loginForm: FormGroup=this.fb.group({
  email:['',[Validators.required]],
  password:['', Validators.required ]
});
constructor(private fb:FormBuilder,
    private authService:AuthService, 
    private messageService:MessageService,
    private router:Router){

}

isnotValid(campo:string){
  return  this.loginForm.controls[campo].errors&&this.loginForm.controls[campo].touched;
}
getMessageEr(campo: string){
let errors= this.loginForm.controls[campo].errors||{};
for (const key of Object.keys(errors)) {
  switch(key){
    case 'email': return "Ingrese un email valido";
    case 'required':return "Este campo es requerido";
    case 'minLength': return `La longitud minima es ${errors['minlength'].requiredLength}`;
  }
  
}
return null;
}
doLogin(){
  if(this.loginForm.invalid){
    this.loginForm.markAllAsTouched();
    return;
  }
  let user:IUser=this.loginForm.value;
  this.authService.autenticaUser(user).subscribe((data:any)=>{
    console.log(data)
    localStorage.setItem('token',data.token)
   this.router.navigate(['home']);
  },
  (error)=>{
    if(error.status==401){
      this.messageService.add({ severity: 'error', summary: 'Login Error', detail: 'Wrong username or password!' });
    }
  })
}
}
