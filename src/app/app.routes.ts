import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RegistrationComponent } from './features/registration/registration.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegistrationComponent }
];