import { Component } from '@angular/core'; 
import {
    FormGroup,
    FormBuilder,
    Validators,
    ReactiveFormsModule,
    AbstractControl,
} from '@angular/forms';
import { Registration } from '../../shared/models/registration.models';

    
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-registration',
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CommonModule,
    ],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss',
})


export class RegistrationComponent {
    registrationForm: FormGroup;

    submittedData: any = null;
    
    regions = [
        { id: 1, name: 'Andalucía' },
        { id: 2, name: 'Cataluña' },
        { id: 3, name:  'Madrid' },
        { id: 4, name: 'Valencia' },
        { id: 5, name: 'Galicia' },
        { id: 6, name: 'Castilla y León' },
    ];
   
    constructor(private fb: FormBuilder) {
        this.registrationForm = this.fb.group(
            {
                firstName: ['', [Validators.required]],
                lastName: ['', [Validators.required]], 
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength (6)]],
                confirmPassword: ['', [Validators.required]],
                birthDate: ['', [Validators.required]],
                regionId: [null, [Validators.required]],
            },
            {
                validators: this.passwordsMatchValidator,
            }
        );
    }
    passwordsMatchValidator (group: AbstractControl): { [key: string]: boolean } | null {
        const password=group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;

        if (password !== confirmPassword) {
            group.get('confirmPassword')?.setErrors({ passwordsMismatch: true });
            return { passwordsMismatch: true };
        }
        
        group.get('confirmPassword')?.setErrors(null);
        return null;
    }
        
    onSubmit(): void {
        if (this.registrationForm.valid) {
            this.submittedData = this.registrationForm.value as Registration;
            console.log('Datos enviados:', this.submittedData);
        } else {
            console.log('Formulario inválido');
        }
    }
}