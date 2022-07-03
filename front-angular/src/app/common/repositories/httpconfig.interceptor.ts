import { CommonService } from './../services/common.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()

export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private router: Router,
    public commonService: CommonService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('BlogAccessToken');

    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });

    return next.handle(request).pipe(tap((success) => {

    },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {

          if (err.status == 401) {
            this.router.navigate(['login']);
          }
        }
      }));
  }

}

