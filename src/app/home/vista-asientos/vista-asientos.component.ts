import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UtilService } from '../services/util.service';
import { IAsiento, IBus } from 'src/app/shared/intefaces/IBus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusService } from '../services/bus.service';

@Component({
  selector: 'vista-asientos',
  templateUrl: './vista-asientos.component.html',
  styleUrls: ['./vista-asientos.component.css']
})
export class VistaAsientosComponent implements OnInit {
  @Output() onPassangerChange:EventEmitter<IBus> = new EventEmitter<IBus>();//registro pasajero en itinerario
  botonLiberar:boolean=false;
  modalInfoAsiento: boolean = false;
  busLocal!: IBus;
  asientos!: IAsiento[];
  pasajeroRegister!: FormGroup;
  idAsiento = "";
  indexAsiento: number = -1;
  constructor(private util: UtilService, private fb: FormBuilder,
    private busService:BusService) { }
  ngOnInit(): void {

    this.util.sharedBus$.subscribe((data) => { // te suscribes al bus que manda desde el itinerio asignar componente
      this.busLocal = data;
      this.asientos = this.busLocal.asientos;
    })
    this.pasajeroRegister = this.fb.group({
      dni: ['', [Validators.required]],
      nombres: ['', Validators.required],

    })
  }

  setAsiento(_id: string) {//setea valores por defecto del asiento seleccionado en el form
    this.modalInfoAsiento = true;
    this.idAsiento = _id;
    console.log(_id)
    this.indexAsiento = this.asientos.findIndex(asiento => asiento._id === this.idAsiento);
    console.log(this.indexAsiento)
    let pasajero = this.busLocal.asientos[this.indexAsiento].pasajero;
    console.log(pasajero);
    
    if (pasajero) {
        this.pasajeroRegister.setValue({
          dni:pasajero.dni,
          nombres:pasajero.nombres
        });
        this.botonLiberar=true;
    }else{
      //si entra aqui
      this.pasajeroRegister.setValue({
        dni:"",
        nombres:""
      });
      this.botonLiberar=false;
  }}
  isnotValid(campo: string) {
    return this.pasajeroRegister.controls[campo].errors && this.pasajeroRegister.controls[campo].touched;
  }

  getMessageEr(campo: string) {
    let errors = this.pasajeroRegister.controls[campo].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'email': return "Ingrese un email valido";
        case 'required': return "Este campo es requerido";
        case 'minLength': return `La longitud minima es ${errors['minlength'].requiredLength}`;
      }

    }
    return null;
  }
  registrarPasajero() {//modifica al array local que se encuentra en el otro componente
    this.busLocal.asientos[this.indexAsiento].pasajero = this.pasajeroRegister.value; // este hace referencia al array que se encuentra en el otro componente
   this.onPassangerChange.emit(this.busLocal);
      
      setTimeout(() => {
        this.modalInfoAsiento = false;
      }
        , 200);
    
    
  }
  liberarAsiento(id:string){
    
    this.busLocal.asientos[this.indexAsiento].pasajero=undefined;
    this.onPassangerChange.emit(this.busLocal);
    this.modalInfoAsiento=false;
  }

}
