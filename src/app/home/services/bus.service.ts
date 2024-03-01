import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBus } from 'src/app/shared/intefaces/IBus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {

 
  url:string="http://127.0.0.1:3001/api/";
  constructor(private http:HttpClient) { }
  getAllBuses():Observable<IBus[]>{
    return this.http.get<IBus[]>(`${this.url}bus`);
  }
  saveBus(bus:IBus):Observable<IBus>{
    return this.http.post<IBus>(`${this.url}bus`,bus);
  }
  deleteBus(id:string){
    return this.http.delete(`${this.url}bus/${id}`);
  } 
  updateBus(id:string, bus:IBus): Observable<IBus>{
    return this.http.put<IBus>(`${this.url}bus/${id}`, bus);
  }
  existeplaca(placa:String):Observable<boolean> {
    return this.http.get<boolean>(`${this.url}bus/existe-placa/${placa}`);
  }
 
}
