import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/shared/intefaces/IUser';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string="http://127.0.0.1:3001/api/auth/";
  constructor(private http:HttpClient, private router:Router) { }

  autenticaUser(email:IUser): Observable<IUser>{
    return this.http.post<IUser>(`${this.url}login`,email)
  }
  loggedIn():boolean{
return localStorage.getItem('token')?true:false;
  }
  getToken(): string | null {
    // Obtiene el token del almacenamiento local
    return localStorage.getItem('token');
}
logout(){
  localStorage.removeItem('token');
  this.router.navigate(['auth'])
}
getUserInfoFromToken(): {_id:string, rol:string, username:string}|null{
  const token = this.getToken();

  if (token) {
    const tokenPayload = token.split('.')[1];  // La parte del payload está en el segundo segmento del token
    const decodedPayload = atob(tokenPayload);

    return JSON.parse(decodedPayload);
  }

  return null;
}
existeDni(dni: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.url}/existe-dni/${dni}`);
}
existeUsername(username:string):Observable<boolean> {
  return this.http.get<boolean>(`${this.url}/existe-username/${username}`);
}

}
