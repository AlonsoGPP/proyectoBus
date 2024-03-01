import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBus } from '../../shared/intefaces/IBus';
import { IChofer } from 'src/app/shared/intefaces/IChofer';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private id=new BehaviorSubject<string>("");
  private sharedBus= new BehaviorSubject<IBus>({} as IBus);
  private updatingBus= new BehaviorSubject<IBus>({} as IBus);
  private updatingChofer=new BehaviorSubject<IChofer|null>(null);

  updatingBus$=this.updatingBus.asObservable();
  sharedBus$=this.sharedBus.asObservable();
  updatinnChofer$=this.updatingChofer.asObservable();
    id$=this.id.asObservable();
  constructor(private authService: AuthService) { }
  setId(id:string){
    this.id.next(id);
  } 
  setSharingBus(bus:IBus){
    this.sharedBus.next(bus);
  }
  setUpdatingBus(bus:IBus){
    this.sharedBus.next(bus);
  }
  setUpdatingChofer(chofer:IChofer|null){
    this.updatingChofer.next(chofer);
  }
  public getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
