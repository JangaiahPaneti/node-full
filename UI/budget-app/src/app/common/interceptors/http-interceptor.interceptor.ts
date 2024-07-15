import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  loader.showLoader();
  return next(req).pipe(finalize(() => loader.hideLoader()));
};
