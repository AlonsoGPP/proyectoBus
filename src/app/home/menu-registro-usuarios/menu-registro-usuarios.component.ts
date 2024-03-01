import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../services/usuario.service';
import { IUser } from 'src/app/shared/intefaces/IUser';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'menu-registro-usuarios',
  templateUrl: './menu-registro-usuarios.component.html',
  styleUrls: ['./menu-registro-usuarios.component.css']
})
export class MenuRegistroUsuariosComponent implements  OnChanges {
  @Output() userCreation: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() userUpdating: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() editingUser?:IUser;
  userRegisterForm!: FormGroup;
constructor(private fb:FormBuilder,
  private messageService:MessageService,
  private usuarioService:UsuarioService,
  private auth:AuthService){}
 
  ngOnChanges(changes: SimpleChanges): void {
    this.userRegisterForm=this.fb.group({
      dni:['',[Validators.required, Validators.maxLength(8)],[this.dniUniqueValidator()]],
      nombres:['', Validators.required ],
      username:['', Validators.required, [this.userNameUniqueValidator()] ],
      password:['',null,[this.checkEditingUser()] ],
      rol:['', Validators.required ],
     
    });;
    this.userRegisterForm.get('password')?.markAsUntouched();
this.userRegisterForm.get('password')?.markAsPristine();
    if(changes["editingUser"]){
     // console.log(this.editingUser)
      this.userRegisterForm.patchValue({
      dni:this.editingUser?this.editingUser.dni:'',
      nombres:this.editingUser?this.editingUser.nombres:'',
      username:this.editingUser?this.editingUser.username:'',
      //password:this.editingUser?this.editingUser.password:'',
      rol:this.editingUser?this.editingUser.rol:'',
})
}
}
dniUniqueValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const dni = control.value;
    if (!dni) {
      return of(null);
    }

    return this.auth.existeDni(dni).pipe(
      map(existe => (existe && this.editingUser===undefined ? { dniNotUnique: true } :null )),
      catchError(() => of(null)) // Manejar errores 
    );
  };
}
checkEditingUser(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const password = control.value;
    
    
    // Verificar si estás en modo edición y la contraseña está ausente
   
    if (this.editingUser === undefined && !password) {
      return of({ required: true });
    } else {
      return of(null);
    }
  };
}
userNameUniqueValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value;
    if (!username) {
      return of(null);
    }

    return this.auth.existeUsername(username).pipe(
      map(existe => (existe && this.editingUser===undefined  ? { usernameNotUnique: true } :null )),
      catchError(() => of(null)) // Manejar errores 
    );
  };
}
  
registroUser(){
let user:IUser=this.userRegisterForm.value;

this.usuarioService.saveUser(user).subscribe((data)=>{
  console.log(data);
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Guardado Correctmente' });
  setTimeout(()=>{
    this.userCreation.emit(false);
    this.userRegisterForm.reset();
  }
    ,1000);
})
}
isnotValid(campo:string){
  return  this.userRegisterForm.controls[campo].errors&&this.userRegisterForm.controls[campo].touched;
}
getMessageEr(campo: string){
let errors= this.userRegisterForm.controls[campo].errors||{};
console.log(errors);

for (const key of Object.keys(errors)) {
  switch(key){
    case 'email': return "Ingrese un email valido";
    case 'required':return "Este campo es requerido";
    case 'minlength': return `La longitud minima es ${errors['minlength'].requiredLength}`;
    case 'dniNotUnique': return `El dni ya existe`;
    case 'usernameNotUnique': return `El usuario ya existe`;
    case 'maxlength':return `La longitud maxima es ${errors['maxlength'].requiredLength}`;
  }
  
}
return null;
}
editarUser(){
  const newPassword=this.userRegisterForm.get('password')?.value;
  const oldPassword=this.editingUser?.password;
  const user:IUser={
    dni:this.userRegisterForm.get('dni')?.value,
      nombres:this.userRegisterForm.get('nombres')?.value,
      username:this.userRegisterForm.get('username')?.value,
      password:newPassword?newPassword:oldPassword,
      rol:this.userRegisterForm.get('rol')?.value,
  }
  this.usuarioService.updateUser(this.editingUser?._id!,user).subscribe((data)=>{
    console.log(data);
    this.userUpdating.emit(true);
    
  },(err)=>{console.log(err)});

}
}
