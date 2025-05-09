import { CommonModule } from '@angular/common';
import { Component,inject,OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginDataService } from '../login-data.service';


@Component({
  selector: 'app-enter-details',
  imports: [ReactiveFormsModule,FormsModule,CommonModule,RouterLink],
  templateUrl: './enter-details.component.html',
  styleUrl: './enter-details.component.css'
})

export class EnterDetailsComponent implements OnInit {

    http=inject(HttpClient)
    receivedValue:string = ''
    subscription!:Subscription
    router=inject(Router)
    userForm = new FormGroup({
    
    age : new FormControl('',[Validators.required]),
    gender:new FormControl('',[Validators.required]),
    condition:new FormControl(false)
  })

  constructor(private newData:LoginDataService){}
  onSubmit(){
    if(this.receivedValue.includes('@')){
      let collectedValues ={
        age:this.userForm.value.age,
        gender:this.userForm.value.gender,
        email:this.receivedValue
      }
      this.http.post("http://localhost:3000/register",collectedValues).subscribe(res =>{
          console.log(res)
          this.router.navigate(['/verify-mobile-number'])
    })
    }else{
      let redefinedValues = {
        age:this.userForm.value.age,
        gender:this.userForm.value.gender,
        phoneNumber:this.receivedValue
      }
      this.http.post("http://localhost:3000/register",redefinedValues).subscribe(res=>{
        console.log(res)
        this.router.navigate(['/verify-mobile-number'])
      })
    }
  }


 ngOnInit(): void {
     this.subscription = this.newData.initialValue.subscribe(m=>{this.receivedValue = m})
 }
}
