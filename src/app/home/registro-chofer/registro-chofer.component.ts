import { Component, OnInit } from '@angular/core';
import { IChofer } from 'src/app/shared/intefaces/IChofer';
import { ChoferService } from '../services/chofer.service';
import { UtilService } from '../services/util.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-registro-chofer',
  templateUrl: './registro-chofer.component.html',
  styleUrls: ['./registro-chofer.component.css'],
  providers: [ConfirmationService, MessageService]
  
})
export class RegistroChoferComponent implements OnInit {
  visible: boolean = false;
  choferes!:IChofer[];
  editingChofer!:IChofer|null;
  constructor (private choferService:ChoferService, private util:UtilService,
    private confirmationService: ConfirmationService, private messageService: MessageService) {}
  ngOnInit(): void {
   this.cargarListaChoferes();
  }

  showDialog(opc:boolean) {
    this.visible = opc;
    this.editingChofer=null;
}
chofereCreation(opc:boolean){
  this.showDialog(opc);
  this.cargarListaChoferes();
}
cargarListaChoferes(){
  this.choferService.getAllChoferes().subscribe((data)=>{
    this.choferes=data;
  })
}

deleteChofer(id:string){


  this.confirmationService.confirm({
    message: '¿Seguro que quiere borrar este registro?',
    header: 'Confirmacion Borrado',
    icon: 'pi pi-info-circle',
    key:id,
    accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Corfirmacion', detail: 'Registro deleted' });
        this.choferService.deleteChofer(id).subscribe((data)=>{
          
          this.cargarListaChoferes();
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
updateChofer(_id:string){
  let indexChofer=this.choferes.findIndex((chofer)=> chofer._id===_id);
  this.editingChofer=this.choferes[indexChofer];

  this.visible=true;
}
}
