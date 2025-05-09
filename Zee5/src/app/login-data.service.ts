import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginDataService {
 
  public  loginMessage = new BehaviorSubject('')
  initialValue = this.loginMessage.asObservable()
  constructor() { }

  restoreValue(value:string){
    this.loginMessage.next(value)
  }
}
