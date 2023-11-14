import {ComponentFixture, TestBed} from '@angular/core/testing';
import { CheckinComponent } from './checkin.component';
import {ApolloTestingModule} from "apollo-angular/testing";
import {TranslateModule} from "@ngx-translate/core";
import {APOLLO_OPTIONS} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {InMemoryCache} from "@apollo/client/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CheckinComponent', () => {
  let fixture: ComponentFixture<CheckinComponent>;
  let component: CheckinComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckinComponent, HttpClientTestingModule, ApolloTestingModule, TranslateModule.forRoot()],

    }).compileComponents();
    fixture = TestBed.createComponent(CheckinComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header')?.textContent).toContain('Check in');
  });

  it('should init the form', () => {
    fixture.detectChanges();
    expect(component.form).toBeTruthy();
  });

  it('should not render error message', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.message-error')).toBeFalsy();
  });

  it('should render three fields', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-input')?.length).toEqual(3);
  });

  it('should fire form validation', () => {
    jest.spyOn(component, 'checkin');
    jest.spyOn(component, 'validateAllFormFields');
    jest.spyOn(component, 'executeCheckin');

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button') as HTMLButtonElement;

    submitButton.click();
    fixture.detectChanges();

    expect(component.form.invalid).toBeTruthy();
    expect(component.checkin).toHaveBeenCalled();
    expect(component.validateAllFormFields).toHaveBeenCalled();
    expect(component.executeCheckin).toHaveBeenCalledTimes(0);
  });

  it('should execute checkin', () => {
    fixture.detectChanges();
    jest.spyOn(component, 'checkin');
    jest.spyOn(component, 'validateAllFormFields');
    jest.spyOn(component, 'executeCheckin');

    const booking = {
      code: 123,
      lastname: 'hammad',
      date: '2023-11-14'
    }
    component.form.patchValue(booking);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button') as HTMLButtonElement;

    submitButton.click();
    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();
    expect(component.checkin).toHaveBeenCalled();
    expect(component.validateAllFormFields).toHaveBeenCalledTimes(0);
    expect(component.executeCheckin).toHaveBeenCalled();
  });
});
