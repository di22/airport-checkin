import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-control-label',
  templateUrl: './control-label.component.html',
  standalone: true,
  imports: [CommonModule],
  styles: [`

  `]
})
export class ControlLabelComponent implements OnChanges {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() customErrorMessages: {[key: string]: string};
  errorMessages: {[key: string]: string} = {
    'required': 'Please enter your ',
    'pattern': 'You must enter the right pattern'
  }
  error: string;

  ngOnChanges(): void {
    if (this.customErrorMessages) this.errorMessages = {...this.errorMessages, ...this.customErrorMessages};
  }

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
