import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink} from '@angular/router';
import { Router } from '@angular/router';
import { LoginDataService } from '../login-data.service';


@Component({
  selector: 'app-login',
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  fb = inject(FormBuilder);
  userForm: FormGroup;
  http = inject(HttpClient)
  router=inject(Router)

  constructor(private data:LoginDataService) {
    this.userForm = this.fb.group({
      Credential: new FormControl('', [Validators.required, this.validateEmailOrPhone])
    })
  }

  validateEmailOrPhone(control: any) {
    const value = control.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    if(!value){
      return {required:true}
    }else if(emailRegex.test(value)){
      return null 
    }else if(phoneRegex.test(value)){
      return null
    }
    else{
      return {invalidInput :true}
    }
  } 

  showError():string{
    const err = this.userForm.controls['Credential']
    if(err.hasError('required')){
       return `Email or Email ID OR Phone number`
    }else if(err.hasError('invalidInput')){
          const checkType = err.value;
          if(typeof checkType === 'string'){
             return "Invalid email"
          }else if(typeof checkType === 'number'){
            return "Invalid number"
          }
          
    }
    return ``
  }

  ngOnInit(): void {
     
  }
  sendMessage(){
    let user = this.userForm.value.Credential.toString()
    this.data.restoreValue(user?user.toString():'email not found')
  }
   onSubmit(){
    if(this.userForm.valid){
    this.http.post("http://localhost:3000/user",this.userForm.value).subscribe(res =>{
    if(res === true){
          this.router.navigate(['/verify-mobile-number'])
        }else{
          this.router.navigate(['/enter-details'])
        }
    })
  }
}
}
