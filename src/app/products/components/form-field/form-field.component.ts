import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent {
  @Input() label!: string; // Etiqueta del campo
  @Input() placeholder!: string; // Texto del placeholder
  @Input() formControlName!: string; // Control del formulario
  @Input() errorMessage: string | undefined = ''; // Mensaje de error de validación
}
