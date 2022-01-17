import { Router } from '@angular/router';
import { Injectable } from '@angular/core'; 
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'; 
import { AuthenticationService } from '../services/authentication.service';
import { Observable, throwError } from 'rxjs'; 
import { catchError } from 'rxjs/operators';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService,
                private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(
                catchError(err => {
                    if (err.status === 401 || err.status === 403) {
                        this.authenticationService.logout();
                        this.router.navigate(['/login']);
                    }

                    return throwError(() => new Error(err.error));
                })
            );
    }

}
