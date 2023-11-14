import {Component, Input} from '@angular/core';
import { FormControl } from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-control-label',
  templateUrl: './control-label.component.html',
  standalone: true,
  imports: [CommonModule],
  styles: [`

  `]
})
export class ControlLabelComponent {
  @Input() control: FormControl;
  @Input() label: string;
  errorMessages: {[key: string]: string} = {
    'required': 'Required',
    'pattern': 'Wrong typo'
  }
  error: string;

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        this.error = this.errorMessages[propertyName];
        return true;
      }
    }
    return false;
  }
}
