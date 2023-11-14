import {TestBed, waitForAsync} from '@angular/core/testing';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { CheckinService } from './checkin.service';

describe('CheckinService', () => {
  let service: CheckinService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [CheckinService],
    });
    service = TestBed.inject(CheckinService);
    controller = TestBed.inject(ApolloTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute checkin query successfully', waitForAsync(() => {
    const mockCheckinDate = {
      code: 123,
      lastname: 'diaa',
      date: '2023-08-01',
    };

    service.execute(mockCheckinDate).subscribe((result) => {
      expect(result.data.checkin.status).toBe(200);
      expect(result.data.checkin.message).toBe('Success Message');
    });

    const op = controller.expectOne('checkin');

    expect(op.operation.variables['code']).toBe(123);
    expect(op.operation.variables['lastname']).toBe('diaa');
    expect(op.operation.variables['date']).toBe('2023-08-01');

    op.flush({
      data: {
        checkin: {
          status: 200,
          message: 'Success Message',
        },
      },
    });
  }));

  afterEach(() => {
    controller.verify();
  });
});
