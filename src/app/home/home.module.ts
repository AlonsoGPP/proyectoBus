import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import{HomeRoutingModule}from './home-routing.module'
import { ButtonModule } from 'primeng/button';
import { RegistroChoferComponent } from './registro-chofer/registro-chofer.component';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { MenuRegistroChoferComponent } from './menu-registro-chofer/menu-registro-chofer.component';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RegistroBusComponent } from './registro-bus/registro-bus.component';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { MenuRegistroBusComponent } from './menu-registro-bus/menu-registro-bus.component';
import { FileUploadModule } from 'primeng/fileupload';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { MenuRegistroUsuariosComponent } from './menu-registro-usuarios/menu-registro-usuarios.component';
import { AsignacionItinerarioComponent } from './asignacion-itinerario/asignacion-itinerario.component';
import { MenuAsignacionChoferComponent } from './menu-asignacion-chofer/menu-asignacion-chofer.component';
import { DropdownModule } from 'primeng/dropdown';//not using
import { TagModule } from 'primeng/tag';
import { VistaAsientosComponent } from './vista-asientos/vista-asientos.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [
    MainPageComponent,
    RegistroChoferComponent,
    MenuRegistroChoferComponent,
    RegistroBusComponent,
    MenuRegistroBusComponent,
    RegistroUsuariosComponent,
    MenuRegistroUsuariosComponent,
    AsignacionItinerarioComponent,
    MenuAsignacionChoferComponent,
    VistaAsientosComponent
    
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    AvatarModule,
    HomeRoutingModule,
    ButtonModule,
    FieldsetModule,
    DialogModule,
    CardModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    TableModule,
    DataViewModule,
    PanelModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    ConfirmDialogModule,
    MenuModule
    
    

  ],
  providers:[
    MessageService
  ]
})
export class HomeModule { }
