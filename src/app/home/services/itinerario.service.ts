import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { IItinerario } from 'src/app/shared/intefaces/IItinerario';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {

  constructor(private http:HttpClient) { }
  
  url:string="http://127.0.0.1:3001/api/";
  getAll():Observable<IItinerario[]>{
    return this.http.get<IItinerario[]>(`${this.url}itinerario`);
  }
  save(itinerario:IItinerario):Observable<IItinerario>{
    return this.http.post<IItinerario>(`${this.url}itinerario`,itinerario);
  }
  delete(id:string){
    return this.http.delete(`${this.url}itinerario/${id}`)
  }
  getItinerarioByDate(date: Date): Observable<IItinerario[]> {
    // Obtener todos los itinerarios y filtrar por fecha
    //console.log(date.toISOString());
    return this.getAll().pipe(
      map(itinerarios => {
        const fechaDeseada = date.toISOString().split('T')[0]; // Convertir la fecha a formato ISO sin la hora
        const itinerariosFiltrados = itinerarios.filter(it => it.fecha.toString().split('T')[0] === fechaDeseada);
        console.log('Itinerarios filtrados por fecha:', itinerariosFiltrados);
        return itinerariosFiltrados;
      })
    );
  } 
  updateItinerario(id:string,itinerario:IItinerario){
    return this.http.put<IItinerario>(`${this.url}itinerario/${id}`,itinerario);
    }

  
  
}
