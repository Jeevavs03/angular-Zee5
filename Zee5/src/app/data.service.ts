import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  public message = new BehaviorSubject('')
  currentValue = this.message.asObservable()

updateValue(message:string){
   this.message.next(message)
}

}
