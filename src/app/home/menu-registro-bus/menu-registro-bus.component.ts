import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BusService } from '../services/bus.service';
import { SafeUrl } from '@angular/platform-browser';
import { IAsiento, IBus } from 'src/app/shared/intefaces/IBus';
import { UtilService } from '../services/util.service';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'menu-registro-bus',
  templateUrl: './menu-registro-bus.component.html',
  styleUrls: ['./menu-registro-bus.component.css']
})
export class MenuRegistroBusComponent implements OnChanges  {
  @Output() busCreation: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() busUpdating: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() busEditar?: IBus;
  public busRegisterForm: FormGroup=this.fb.group({
    placa: [ '', [Validators.required, Validators.maxLength(7), Validators.pattern('^[A-Z]\\d[A-Z]-\\d{3}$')], [this.placaUniqueValidator()]],
    modelo: ['', Validators.required],
    marca: [ '', Validators.required],
    numeroAsientos: [ '', Validators.required],
    // Agrega otras propiedades del formulario según sea necesario
  });;
  updatingBus?:IBus;
  public base64Image: SafeUrl | undefined;
  constructor(
    private fb:FormBuilder,
    private busService:BusService,
    private util: UtilService,
    
  ){}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["busEditar"] ) {
      
     this.busRegisterForm.setValue({
      placa:this.busEditar ? this.busEditar.placa : '',
      modelo: this.busEditar ? this.busEditar.modelo : '',
      marca: this.busEditar ? this.busEditar.marca : '',
      numeroAsientos: this.busEditar ? this.busEditar.asientos.length : ''
     })
    }    
  }
  placaUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const placa = control.value;
      if (!placa) {
        return of(null);
      }
  
      return this.busService.existeplaca(placa).pipe(
        map(existe => (existe && this.busEditar===undefined ? { placaNotUnique: true } :null )),
        catchError(() => of(null)) // Manejar errores 
      );
    };
  }
  isnotValid(campo:string){
    return  this.busRegisterForm.controls[campo].errors&&this.busRegisterForm.controls[campo].touched;
  }
  getMessageEr(campo: string){
  let errors= this.busRegisterForm.controls[campo].errors||{};
  console.log(errors);
  for (const key of Object.keys(errors)) {
    switch(key){
      case 'email': return "Ingrese un email valido";
      case 'required':return "Este campo es requerido";
      case 'minLength': return `La longitud minima es ${errors['minlength'].requiredLength}`;
      case 'placaNotUnique':return 'La placa ya existe';
      case 'maxlength':return `La longitud maxima es ${errors['maxlength'].requiredLength}`;
      case 'pattern':return `Placa no valida! EJ: A1B-123`
    }
    
  }
  return null;
  }
  registroBus(){
    let numAsientos=this.busRegisterForm.get('numeroAsientos')?.value;
    let asientosG:IAsiento[]=[];
    
    for(let i=0;i<numAsientos;i++){
      asientosG.push({correlativo:(i+1)})
    }
    let  bus: IBus={
      placa: this.busRegisterForm.get('placa')?.value,
      modelo: this.busRegisterForm.get('modelo')?.value,
      marca: this.busRegisterForm.get('marca')?.value,
      asientos: asientosG,
     
    }
   this.busService.saveBus(bus).subscribe((data)=>{
    console.log(data);
    setTimeout(()=>{
      this.busCreation.emit(true);
    }
      ,1000);

   })
  }
  editarBus(){
    const bus:IBus={
      placa:this.busRegisterForm.get('placa')?.value,
      modelo:this.busRegisterForm.get('modelo')?.value,
      marca:this.busRegisterForm.get('marca')?.value,
      asientos:this.busEditar!.asientos
    }
    this.busService.updateBus(this.busEditar!._id!,bus).subscribe((data)=>{
      console.log(data);
      this.busUpdating.emit(true);

    })
  }
}
