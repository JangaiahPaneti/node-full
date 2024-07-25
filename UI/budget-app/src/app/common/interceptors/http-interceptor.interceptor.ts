import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  const authService = inject(AuthService);
  loader.showLoader();
  req = req.clone({
    setHeaders: {
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${authService.getToken()}`,
    },
  });
  return next(req).pipe(finalize(() => loader.hideLoader()));
};
