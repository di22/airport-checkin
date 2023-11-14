import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

//TODO:: it is better to apply event bus pattern to track the data between the components easily the more readable
@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  subject: ReplaySubject<string> = new ReplaySubject<string>(1);

  getMessage = (): Observable<string> => this.subject.asObservable();
}
