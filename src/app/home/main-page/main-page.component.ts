import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  rol:string="";
  logdata:any;
  items!:any;
constructor(private router:Router, private auth:AuthService){}
  ngOnInit(): void {
   
    this.logdata=this.auth.getUserInfoFromToken()!; 
    this.rol=this.logdata.rol;
    this.items = [
      {
          label: 'Opciones',
          items: [
              {
                  label: 'Salir',
                  icon: 'pi pi-sign-out'
                  ,
                  command: () => {
                      this.logout()
                  }
              }
          ]
      }]
  }
url='home/';
  loadPage(page:string){
   
this.router.navigate([this.url, page]);
  }
  logout(){
   this.auth.logout();
;  }
}
