import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred.';

        if (error.status >= 400 && error.status < 500) {
          errorMessage = `Client-side error: ${error.status} - ${error?.error?.error_description || error.message}`;
        } else if (error.status >= 500 && error.status < 600) {
          errorMessage = `Server-side error: ${error.status} - ${error?.error?.error_description || error.message}`;
        }
        Swal.fire({
          icon: 'error',
          title: 'Sorry, an error occurred!',
          text: errorMessage,
        });
        return throwError(() => error);
      })
    );
  }
}
