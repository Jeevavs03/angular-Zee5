import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { EnterDetailsComponent } from './enter-details/enter-details.component';

export const routes: Routes = [{
    path:'',
    redirectTo:'login',
    pathMatch:'full'
},{
    path:'login',
    component:LoginComponent
    
},{
    path:'register',
    component:RegisterComponent
},{
    path:'verify-mobile-number',
    component:OtpComponent
},{
    path:'enter-details',
    component:EnterDetailsComponent
}

];
