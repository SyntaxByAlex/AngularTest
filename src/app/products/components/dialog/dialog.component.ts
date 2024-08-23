import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input()
  public message: string = ''

  @Input()
  public visible?: boolean;

  @Output()
  private onAccept = new EventEmitter<any>();

  @Output()
  private onReject = new EventEmitter<any>();


  public accept(): void {
    this.onAccept.emit()
  }

  public reject(): void {
    this.onReject.emit()
  }


}
