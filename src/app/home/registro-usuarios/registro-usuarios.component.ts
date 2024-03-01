import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { IUser } from 'src/app/shared/intefaces/IUser';
import { UtilService } from '../services/util.service';
import { IChofer } from 'src/app/shared/intefaces/IChofer';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class RegistroUsuariosComponent implements OnInit {
  
  visible: boolean = false;
  users!:IUser[];
  editingUser?:IUser;
  constructor (private usuarioService:UsuarioService,
    private utilService:UtilService,
    private confirmationService: ConfirmationService, private messageService: MessageService
    ) {}
  ngOnInit(): void {
   this.cargarListaUsers();
  }

  showDialog(opc:boolean) {
    this.visible = opc;
    this.editingUser=undefined;
}
userCreation(opc:boolean){
  this.showDialog(opc);
  this.cargarListaUsers();
}
cargarListaUsers(){
  this.usuarioService.getAllUsers().subscribe((data)=>{
    console.log(data);
    this.users=data;
  })
}
formatISODateToDDMMYYYY(isoDateString: string): string {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-indexados
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
}
deleteUser(id:string){

  this.confirmationService.confirm({
    message: '¿Seguro que quiere borrar este registro?',
    header: 'Confirmacion Borrado',
    icon: 'pi pi-info-circle',
    key:id,
    accept: () => {
      this.usuarioService.deleteUser(id).subscribe((data)=>{
        console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Borrado', detail: 'Eliminado exitosamente!' });
        this.cargarListaUsers();

      });
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
modificar(_id:string){
  let indexUser=this.users.findIndex((user)=> user._id===_id);
  this.editingUser=this.users[indexUser];

  this.visible=true;
}
}
