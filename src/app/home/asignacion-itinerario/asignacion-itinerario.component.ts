import { Component, OnInit } from '@angular/core';
import { IBus } from 'src/app/shared/intefaces/IBus';
import { BusService } from '../services/bus.service';
import { ItinerarioService } from '../services/itinerario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IItinerario } from '../../shared/intefaces/IItinerario';
import { UtilService } from '../services/util.service';
import { IChoferBus } from 'src/app/shared/intefaces/IChoferBus';
import { ChoferService } from '../services/chofer.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-asignacion-itinerario',
  templateUrl: './asignacion-itinerario.component.html',
  styleUrls: ['./asignacion-itinerario.component.css']
})
export class AsignacionItinerarioComponent implements OnInit {
  layout: any = 'list';
  buses!: IBus[];
  busInfo?:IBus;
  itinerarioAsignado?: boolean;
  fecha?: Date;
  itinerarios!: IItinerario[];
  itinerarioForm!: FormGroup;
  rolUser!:string;
  constructor(private busService: BusService,
    private itinerarioService: ItinerarioService,
    private fb: FormBuilder,
    private util: UtilService,
    private choferService: ChoferService,
    private router: Router,
    private auth:AuthService) { }
  ngOnInit(): void {
    //this.cargarBuses();
    //this.getAllItinerio();
    this.itinerarioForm = this.fb.group({
      fechaIti: ['', [Validators.required]],

    });
   this.rolUser= this.auth.getUserInfoFromToken()!.rol;
  }
  visible: boolean = false;
  visibleAsientos: boolean = false;
  showDialog(opc: boolean) {

    this.visible = opc;
  }
  getAllItinerio() {
    this.itinerarioService.getAll().subscribe((data) => {
      console.log(data);
    })
  }
  cargarBuses() {//realodea los buses desde la base de datos
    if (!this.itinerarioAsignado) {
      this.busService.getAllBuses().subscribe((data) => {
        this.buses = data;
        //  console.log(this.buses)
      })
    }
  }


  showModalChoferAsing(opc: boolean, _id: string) {// modal de asignacion de chofer, busid
    this.visible = true;
  if(this.itinerarios.length>0){
    let indexBus = this.buses.findIndex(bus => _id === bus._id);
    this.busInfo=this.buses[0];
  }
    this.util.setId(_id);
  }
  onSelectDate(date: Date) { // sirve para la alerta de si hay un itinerario en la fecha seleccionada
    this.fecha = date
    this.itinerarioService.getItinerarioByDate(date).subscribe((itinerarios) => {
      console.log(itinerarios);

      if (itinerarios.length > 0) {
        this.itinerarioAsignado = true;
        this.buses = [];//vaceo los buses ya que hay un itinerio
      } else {
        this.itinerarioAsignado = false;
        this.cargarBuses();
        this.itinerarios = [];//limpio itinerario ya que la fecha esta libre
      }

    });

  }
  cargarBusesDeItinerario() {//extrae los buses de itinerario para editarlos localmente
    let fechaForm = this.itinerarioForm.get('fechaIti')?.value as Date;
    //console.log(fechaForm)
    if (fechaForm) {
      this.itinerarioService.getItinerarioByDate(fechaForm).subscribe((itinerarios: IItinerario[]) => {
        console.log(itinerarios)
        if (itinerarios.length > 0) {
          this.itinerarios = itinerarios;
          this.buses = this.itinerarios[0].buses;//esto extrae los buses de itinerario
        } else {
          console.log("Este dia no tiene itinerarios");

        }
      })
    }
  }
  createItinerario() { // cra un itinerario filtrando los buses locales que ya han sido cargado previamente
    let busesIti: IBus[] = this.buses.filter(bus => bus.chofer != null); // solo se gurdaran buses con choferes.
    let itinerario: IItinerario = {

      fecha: this.itinerarioForm.get('fechaIti')?.value,
      buses: busesIti,
      createdAt: new Date()
    }
    this.itinerarioService.save(itinerario).subscribe((data) => {
      this.cargarBusesDeItinerario();
    })
  }
  asignarChofer(event: IChoferBus) {// se obtiene el index del bus seleccionado para asignaerle un chofer recibe evento del menu asignacio chofer
    let indexBus = this.buses.findIndex(bus => event._idBus === bus._id);
    this.choferService.getById(event._idChofer).subscribe((data) => {
      if (indexBus != -1) {
        this.buses[indexBus].chofer = data;
        setTimeout(() => {
          this.visible = false;
        }
          , 5000);
      }
    })

  }
  openSeatsView(busId: string) {// abre la vista de asientos de acuerdo al los buses cargados
    let bus = this.buses.find(bus => bus._id == busId);
    this.util.setSharingBus(bus as IBus);
    this.visibleAsientos = true
  }
  updateItinerarioPassanger(event: IBus) {// recibe evento del 
    console.log(event)

    if (this.itinerarios.length > 0) {// este es el que se encarga de diferencia si se guarda localmente o en base de datos, ya que si no hay un itinerario en memoria solo guarda localmente
      console.log("entro aqui")
      let indexBus = this.itinerarios[0].buses.findIndex(bus => event._id === bus._id);
      this.itinerarios[0].buses[indexBus] = event;
      this.itinerarioService.updateItinerario(this.itinerarios[0]._id!, this.itinerarios[0]).subscribe(
        (data) => { console.log(data); }
      )
    }
  }
}