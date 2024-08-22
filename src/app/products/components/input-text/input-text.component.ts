import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css'
})
export class InputTextComponent {

  @Input()
  public error?: boolean | null;
  @Input()
  public typeInput: string = 'text';
  @Input()
  public placeholder?:string;

}
