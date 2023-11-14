import { Routes } from '@angular/router';
import {CheckinComponent} from "./feature/check-in/checkin.component";
import {CheckinSuccessComponent} from "./feature/checkin-success/checkin-success.component";

export const routes: Routes = [
  {
    path: '',
    component: CheckinComponent,
  },
  {
    path: 'success',
    component: CheckinSuccessComponent,
  }
];
