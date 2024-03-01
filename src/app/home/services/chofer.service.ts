import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IChofer } from 'src/app/shared/intefaces/IChofer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChoferService {
  url:string="http://127.0.0.1:3001/api/";
  constructor(private http:HttpClient) { }
  getAllChoferes():Observable<IChofer[]>{
    return this.http.get<IChofer[]>(`${this.url}chofer`);
  }
  saveChofer(chofer:IChofer):Observable<IChofer>{
    return this.http.post<IChofer>(`${this.url}chofer`,chofer);
  }
  deleteChofer(id:string){
    return this.http.delete(`${this.url}chofer/${id}`)
  }
  getById(id:string):Observable<IChofer>{
    return this.http.get<IChofer>(`${this.url}chofer/${id}`);
  }
  updateChofer(id:string, chofer:IChofer): Observable<IChofer>{
    return this.http.put<IChofer>(`${this.url}chofer/${id}`, chofer);
  }
  existeDni(dni: string): Observable<boolean> {

    
    return this.http.get<boolean>(`${this.url}chofer/existe-dni/${dni}`);;
    
  }
}
