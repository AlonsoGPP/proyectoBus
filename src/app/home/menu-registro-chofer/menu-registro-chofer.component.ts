import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IChofer } from 'src/app/shared/intefaces/IChofer';
import { ChoferService } from '../services/chofer.service';
import { EventEmitter } from '@angular/core';
import { UtilService } from '../services/util.service';
import { Observable, catchError, map, of } from 'rxjs';


@Component({
  selector: 'menu-registro-chofer',
  templateUrl: './menu-registro-chofer.component.html',
  styleUrls: ['./menu-registro-chofer.component.css'],
  providers:[MessageService]
})
export class MenuRegistroChoferComponent implements OnChanges  {
  @Output() choferCreation: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() choferUpdating: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() editingChofer?:IChofer|null;
  choferRegisterForm!: FormGroup;
constructor(private fb:FormBuilder,
  private messageService:MessageService,
  private choferService:ChoferService,
  private util:UtilService){
    
  }
 
  ngOnChanges(changes: SimpleChanges): void {
    this.choferRegisterForm=this.fb.group({
      dni:['',[Validators.required, Validators.maxLength(8)],[this.dniUniqueValidator()]],
      nombres:['', Validators.required ],
      fechaIngreso:[new Date(), Validators.required ]
    });;
      if(changes["editingChofer"]){
        
        this.choferRegisterForm.setValue({
          dni:this.editingChofer?this.editingChofer.dni:'',
          nombres:this.editingChofer?this.editingChofer.nombres:'',
          fechaIngreso:this.editingChofer?new Date(this.editingChofer.fechaIngreso): new Date()
        })
      }
  }
  
registroChofer(){
let chofer:IChofer=this.choferRegisterForm.value;
this.choferService.saveChofer(chofer).subscribe((data)=>{
  console.log(data);
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Guardado Correctmente' });
  setTimeout(()=>{
    this.choferCreation.emit(false);
  }
    ,1000);
})
}
dniUniqueValidator(): AsyncValidatorFn {
  
  
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const dni = control.value;
    
    
    if (!dni) {
      return of(null);
    }
    
    return this.choferService.existeDni(dni).pipe(
      map(existe => (existe && !this.editingChofer ? { dniNotUnique: true } :null )),
      catchError(() => of(null)) // Manejar errores 
    );
  };
}
isnotValid(campo:string){
  return  this.choferRegisterForm.controls[campo].errors&&this.choferRegisterForm.controls[campo].touched;
}
getMessageEr(campo: string){
let errors= this.choferRegisterForm.controls[campo].errors||{};
console.log(errors);

for (const key of Object.keys(errors)) {
  switch(key){
    case 'email': return "Ingrese un email valido";
    case 'required':return "Este campo es requerido";
    case 'minLength': return `La longitud minima es ${errors['minlength'].requiredLength}`;
    case 'dniNotUnique': return `El dni ya existe`;
    case 'maxlength':return `La longitud maxima es ${errors['maxlength'].requiredLength}`;
  }
  
}
return null;
}
editarChofer(){
  const chofer:IChofer={
    dni:this.choferRegisterForm.get('dni')?.value,
    nombres:this.choferRegisterForm.get('nombres')?.value,
    fechaIngreso:this.choferRegisterForm.get('fechaIngreso')?.value,
  }
  this.choferService.updateChofer(this.editingChofer?._id!,chofer).subscribe((data)=>{
    console.log(data);
    this.choferUpdating.emit(true);
    
  },(err)=>{console.log(err)});

  
}
}
