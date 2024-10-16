import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
// import { AuthGuard } from './Guards/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  { path: 'home',component:HomeComponent },
  {path:'user-profile',component:UserProfileComponent},
  {path:'flight-booking',
    loadChildren:()=> import('./flight-booking/flight-booking.module').then(m=>m.FlightBookingModule),
   
  },
  {path:'About',component:AboutUsComponent},
  {path: '**',redirectTo:'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
