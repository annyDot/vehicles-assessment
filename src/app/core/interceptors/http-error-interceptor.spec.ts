import { TestBed } from '@angular/core/testing';
import { ErrorInterceptor } from './http-error-interceptor';
import Swal from 'sweetalert2';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

describe('HttpErrorInterceptor', () => {
  let interceptor: ErrorInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorInterceptor],
    });

    interceptor = TestBed.inject(ErrorInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should handle client-side errors (4xx)', () => {
    const errorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request',
      error: { error_description: 'Invalid request' },
    });

    const req = new HttpRequest('GET', '/test');
    const httpHandler: HttpHandler = {
      handle: (): Observable<any> => {
        return throwError(() => errorResponse);
      },
    };

    interceptor.intercept(req, httpHandler).subscribe(
      () => {},
      () => {
        expect(Swal.fire).toHaveBeenCalledWith({
          icon: 'error',
          title: 'Sorry, an error occurred!',
          text: 'Client-side error: 400 - Invalid request',
        } as any);
      }
    );
  });

  it('should handle server-side errors (5xx)', () => {
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
      error: { error_description: 'Server is down' },
    });

    const req = new HttpRequest('GET', '/test');

    const httpHandler: HttpHandler = {
      handle: (): Observable<any> => {
        return throwError(() => errorResponse);
      },
    };

    interceptor.intercept(req, httpHandler).subscribe(
      () => {},
      () => {
        expect(Swal.fire).toHaveBeenCalledWith({
          icon: 'error',
          title: 'Sorry, an error occurred!',
          text: 'Server-side error: 500 - Server is down',
        } as any);
      }
    );
  });
});
