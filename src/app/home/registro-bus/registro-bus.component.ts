import { Component, OnInit } from '@angular/core';
import { IBus } from 'src/app/shared/intefaces/IBus';
import { BusService } from '../services/bus.service';
import { UtilService } from '../services/util.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-registro-bus',
  templateUrl: './registro-bus.component.html',
  styleUrls: ['./registro-bus.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class RegistroBusComponent implements OnInit {
  layout: any = 'list';
buses!:IBus[];
busEditar?: IBus;
visible: boolean = false;
constructor(private busService:BusService, private util:UtilService,
  private confirmationService: ConfirmationService, private messageService: MessageService){}
  ngOnInit(): void {
    this.cargarBuses();
    
  }
  cargarBuses(){
    this.busService.getAllBuses().subscribe((data)=>{
      this.buses=data;
     
      
    })
  }
  busCreation(opc:boolean){
    this.showDialog(opc);
    this.cargarBuses();
  }
  showDialog(opc:boolean){
    
    this.visible=opc;
    this.busEditar=undefined
    
  }
  showEditingDialog(opc:boolean,id?:string){
    let bus=this.buses.find((bus)=>bus._id===id);
    console.log(bus)
    this.visible=opc
    this.busEditar=bus;
    
  }
  deleteBus(id:string){

    this.confirmationService.confirm({
      message: '¿Seguro que quiere borrar este registro?',
      header: 'Confirmacion Borrado',
      icon: 'pi pi-info-circle',
      key:id,
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Corfirmacion', detail: 'Registro deleted' });
          this.busService.deleteBus(id).subscribe((data)=>{
            
            this.cargarBuses();
          })
      },
      reject: (type:number) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  break;
                  
          }
          
      }
  });

  
  }
  busUpdating(){
    this.visible=false;
    this.cargarBuses();
  }
  
}
