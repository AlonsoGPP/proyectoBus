import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IUser } from 'src/app/shared/intefaces/IUser';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url:string="http://127.0.0.1:3001/api/auth/";
  constructor(private http:HttpClient, private authService: AuthService) { }
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  getAllUsers():Observable<IUser[]>{
    const headers=this.getHeaders();
    return this.http.get<IUser[]>(`${this.url}`,{headers});
  }
  saveUser(user:IUser):Observable<IUser>{
    return this.http.post<IUser>(`${this.url}`,user);
  }
  deleteUser(id:string){
    return this.http.delete(`${this.url}${id}`)
  }
  updateUser(id:string, user:IUser): Observable<IUser>{
    return this.http.put<IUser>(`${this.url}${id}`, user);
  }
}
