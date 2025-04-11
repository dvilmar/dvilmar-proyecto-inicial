// Importaciones necesarias para el componente y formularios reactivos
import { Component } from "@angular/core";
import {
    FormGroup,      //Clase que representa un grupo de controles de formulario
    FormBuilder,    //Clase para facilitar la creación de formularios reactivos
    Validators,     //Conjunto de validadores predefinidos paraa formularios
    ReactiveFormsModule, //Modulo para usar formularios reactivos
    AbstractControl,    //Clase base para los controles de formulario
} from '@angular/forms';
import { Registration } from '../../shared/models/registration.models';//Modelo para estructurar los datos del formulario

//Importaciones de Angular Material para diseño y campos de entrada
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-registration', //Nombre del selector para usar el componente en HTML
    imports: [
        ReactiveFormsModule,    //Módulo para usar formularios reactivos
        MatCardModule,          //Tarjetas de diseño de Angular Material
        MatFormFieldModule,     //Campos de entrada estilizados de Angular Material
        MatInputModule,         //Entradas de texto
        MatButtonModule,        //Botones estilizados
        MatSelectModule,        //Selectores desplegables
        MatDatepickerModule,    //Selector de fechas
        MatNativeDateModule,    //Compatibilidad con fechas nativas
        CommonModule,           //Funcionalidades comunes de angular
    ],
    templateUrl: './registration.component.html',   //Ruta al archivo HTML del componente
    styleUrl: './registration.component.scss',        //Ruta al archivo de estilos SCSS del componente
})
export class RegistrationComponent {
    registrationForm: FormGroup;  //Declaración del formulario reactivo

    submittedData: any = null;    //Variable para almacenar los datos enviados al formulario

    //Lista de comunidades autónomas que se mostrarán en un selector
    regions = [
        { id: 1, name: 'Andalucia' },
        { id: 2, name: 'Cataluña' },
        { id: 3, name: 'Madrid' },
        { id: 4, name: 'Valencia' },
        { id: 5, name: 'Galicia' },
        { id: 6, name: 'Castilla y León' }
        //Se pueden añadir mas regiones si es necesario
    ];

    //Constructor para inyectar el FormBuilder y configurar el formulario
    constructor(private fb: FormBuilder) {
        //Inicialización del formulario reactivo con campos y validaciones
        this.registrationForm = this.fb.group(
            {
                firstName: ['', [Validators.required]],   //Campo obligatorio
                lastName: ['', [Validators.required]],    //Campo obligatorio
                email: ['', [Validators.required, Validators.email]],//Campo obligatorio con validación de email
                password: ['', [Validators.required, Validators.minLength(6)]],//Contraseña obligatoria con longitud minima
                confirmPassword: ['', [Validators.required]],//Confirmación de contraseña obligatoria
                birthDate: ['', [Validators.required]],//Fecha de nacimiento obligatoria
                regionId: ['', [Validators.required]],//Campo para seleccionar una region obligatoria
            },
            {
                validators: this.passpasswordsMatchValidator, //Validador personalizador a nivel de grupo
            }
        );
    }

    //Validador personalizado para verificar que las contraseña coinciden
    passpasswordsMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
        const password = group.get('password')?.value;  //Obtiene el valor del campo "password"
        const confirmPassword = group.get('confirmPassword')?.value; //Obtiene el valor del campo "confirmPassword"

        //Si las contraseñas no coinciden, establece un error en el campo "confirmPassword"
        if (password !== confirmPassword) {
            group.get('confirmPassword')?.setErrors({ passwordsMismatch: true });;
            return { passwordsMismatch: true };  //Devuelve el error a nivel de grupo
        }

        //Si coinciden, elimina cualquier error previo en "confirmPassword"
        group.get('confirmPassword')?.setErrors(null);
        return null;
    }

    //Método que se ejecuta al enviar el formulario
    onSubmit(): void {
        //Verifica si el formulario es válido
        if (this.registrationForm.valid) {
            //Asigna los valores del formulario a la variable submittedData y los ajusta al modelo Registration
            this.submittedData = this.registrationForm.value as Registration;
            console.log('Datos enviados:', this.submittedData); //Muestra los datos en la consola
        } else {
            console.log('Formulario inválido'); //Muestra un mensaje si el formulario es inválido
        }
    }
}