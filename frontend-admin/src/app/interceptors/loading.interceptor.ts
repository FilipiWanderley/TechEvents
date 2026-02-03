import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const snackBar = inject(MatSnackBar);
  
  loadingService.show();

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro inesperado.';

      if (error.status === 400 && error.error) {
        // Handle Validation Errors (Map<String, String>)
        if (typeof error.error === 'object') {
          const errors = Object.entries(error.error)
            .map(([field, msg]) => `${field}: ${msg}`)
            .join(' | ');
          errorMessage = `Erro de Validação: ${errors}`;
        } else {
          errorMessage = `Erro 400: ${error.error}`;
        }
      } else if (error.status === 0) {
        errorMessage = 'Serviço indisponível. Verifique sua conexão.';
      } else if (error.status === 500) {
        errorMessage = 'Erro interno no servidor.';
      }

      snackBar.open(errorMessage, 'Fechar', {
        duration: 5000,
        panelClass: ['error-snackbar'], // We'll need to define this style
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      return throwError(() => error);
    }),
    finalize(() => loadingService.hide())
  );
};
