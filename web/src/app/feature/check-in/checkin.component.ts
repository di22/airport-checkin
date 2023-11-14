import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputComponent} from "../../shared/form/input/input.component";
import {CheckinService} from "../../domain/checkin/checkin.service";
import {Router} from "@angular/router";
import {ShareDataService} from "../../core/services/share-data.service";

@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, InputComponent],
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  form: FormGroup;
  lastname: FormControl;
  code: FormControl;
  date: FormControl;
  serverError: string;
  constructor(private formBuilder: FormBuilder,
              private checkinService: CheckinService,
              private router: Router,
              private shareDataService: ShareDataService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      lastname: ['', [Validators.required, Validators.pattern('[-_a-zA-Z]*')]],
      code: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      date: ['', [Validators.required]]
    });

    this.lastname = <FormControl>this.form.get('lastname');
    this.code = <FormControl>this.form.get('code');
    this.date = <FormControl>this.form.get('date');
  }

  checkin(): void {
    if (this.form.invalid) this.validateAllFormFields(this.form);
    else this.executeCheckin();
  }

  executeCheckin(): void {
    this.checkinService.execute(this.form.value).subscribe(res => {
      const message = res.data?.checkin?.message;
      this.shareDataService.subject.next(message);
      this.router.navigateByUrl('/success');
    }, error => {
      this.serverError = error?.message;
    })
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
