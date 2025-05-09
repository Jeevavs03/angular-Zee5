import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginDataService } from '../login-data.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
@Component({
  selector: 'app-otp',
  imports: [RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit {

  constructor(private data:LoginDataService){}

  http = inject(HttpClient)
  router = inject(Router)
  receivedValue:any = ''
  subscription!:Subscription

  formOtp = new FormGroup({
      otp1 : new FormControl('',[Validators.required]),
      otp2 : new FormControl('',[Validators.required]),
      otp3 : new FormControl('',[Validators.required]),
      otp4 : new FormControl('',[Validators.required])
  })


  
  checkType(){
    let otp = this.formOtp.value.otp1+""+this.formOtp.value.otp2+""+this.formOtp.value.otp3+""+this.formOtp.value.otp4
    
    
  }

  moveToNext(event: Event, nextInput: HTMLInputElement) {
    const target = event.target as HTMLInputElement;
    if (target.value.length === target.maxLength && nextInput) {
      nextInput.focus();
    }
  }

  moveOnDelete(event: Event, previousInput: HTMLInputElement) {
    const target = event.target as HTMLInputElement;
    if (target.value.length === 0 && previousInput) {
      previousInput.focus();
    }
  }
  
  ngOnInit(): void {
    this.subscription = this.data.initialValue.subscribe(m=>{this.receivedValue = m})
}
}
