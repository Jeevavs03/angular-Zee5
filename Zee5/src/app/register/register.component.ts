import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule} from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { LoginDataService } from '../login-data.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink,CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

    userForm = new FormGroup({
      emailOrPhone: new FormControl('', [Validators.required, this.validateEmailOrPhone])
    })
     
 validateEmailOrPhone(control: any) {
    const value = control.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    if(!value){
      return {required:true}
    }else if(emailRegex.test(value) || phoneRegex.test(value)){
      return null 
    }else{
      return {invalidInput :true}
    }
  } 

  showError():string{
    const err = this.userForm.controls['emailOrPhone']
    if(err.hasError('required')){
       return `Email or Email ID OR Phone number`
    }else if(err.hasError('invalidInput')){
          const checkType = err.value;
          if(typeof checkType === 'string'){
             return "Invalid email"
          }
          return "Invalid number"
    }
    return ``
  }
  onSubmit(){
    if(this.userForm.valid){
      this.router.navigate(['/enter-details'])
   }else{
      console.log("Invalid on submit")
    }
  }
  constructor(private router:Router,private data:LoginDataService){
    this.router = router
  }


ngOnInit(): void {
    
}
sendMessage(){
  let user = this.userForm.value.emailOrPhone?.toString()
    this.data.restoreValue(user?user.toString():'email not found')
}
}
