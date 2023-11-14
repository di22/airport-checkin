import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ControlLabelComponent} from "../control-label/control-label.component";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlLabelComponent],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() control: FormControl = new FormControl<any>('');
  @Input() label: string;
}
