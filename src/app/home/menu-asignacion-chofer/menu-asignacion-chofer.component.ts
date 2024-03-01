import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChoferService } from '../services/chofer.service';
import { IChofer } from 'src/app/shared/intefaces/IChofer';
import { UtilService } from '../services/util.service';
import { IChoferBus } from 'src/app/shared/intefaces/IChoferBus';
import { IBus } from 'src/app/shared/intefaces/IBus';

@Component({
  selector: 'app-menu-asignacion-chofer',
  templateUrl: './menu-asignacion-chofer.component.html',
  styleUrls: ['./menu-asignacion-chofer.component.css']
})
export class MenuAsignacionChoferComponent implements OnInit, OnChanges{
  @Output() onChoferDesinacion: EventEmitter<IChoferBus> = new EventEmitter<IChoferBus>();
  @Input() busInfo?:IBus;
  choferAsinacionForm!:FormGroup;
  choferes!:IChofer[];
  _idBus:string="";
  choferSelected:any={
    _id:'',
    nnombres:''
  }
  constructor(private fb:FormBuilder, private choferService:ChoferService, private util: UtilService){}
  ngOnInit(): void {
    this.choferAsinacionForm=this.fb.group({
      _id:[''],
    })
    this.util.id$.subscribe((data)=>{
      this._idBus=data;
    })
    this.cargarChoferes()
  }
ngOnChanges(changes: SimpleChanges): void {
    if(changes['busInfo']){
    if(this.busInfo!=undefined){
      this.choferAsinacionForm.patchValue({
        _id:(this.busInfo?.chofer?._id)?this.busInfo?.chofer?._id:''
      })
    }
    }
}
  emitChofer(){
    let _idChofer=this.choferAsinacionForm.get('_id')?.value;
    let choferBus: IChoferBus={
      _idBus: this._idBus,
      _idChofer: _idChofer
    }
    this.onChoferDesinacion.emit(choferBus);
    //console.log(_idChofer)
  }
  isnotValid(campo:string){
    return  this.choferAsinacionForm.controls[campo].errors&&this.choferAsinacionForm.controls[campo].touched;
  }
   cargarChoferes(){
    this.choferService.getAllChoferes().subscribe((data)=>{
      this.choferes=data;
    })
  }
  getMessageEr(campo: string){
  let errors= this.choferAsinacionForm.controls[campo].errors||{};
  for (const key of Object.keys(errors)) {
    switch(key){
      case 'email': return "Ingrese un email valido";
      case 'required':return "Este campo es requerido";
      case 'minLength': return `La longitud minima es ${errors['minlength'].requiredLength}`;
    }
    
  }
  return null;
  }
  setSelectedChofer(nombres:string, _id:string){
    this.choferSelected.nombres=nombres;
    this.choferSelected._id=_id;
  }
}
