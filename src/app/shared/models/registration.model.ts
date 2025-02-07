
export interface Registration {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthDate: Date; // Nuevo campo para la fecha de nacimiento 
    regionId: number; // ID de la comunidad autónoma
}

import {
    FormGroup,
    FormBuilder,
    Validators,
    } from '@angular/forms';

import { Registration } from '../../shared/models/registration.models';
    @Component({
    selector: 'app-registration',
    imports: [
    1,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    })