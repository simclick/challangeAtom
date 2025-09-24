import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const key = environment.apiKey;
  return next(key ? req.clone({ setHeaders: { 'x-api-key': key } }) : req);
};
