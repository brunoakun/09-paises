import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IApiResp } from '../interfaces/api-resp';
import { catchError, delay, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  entorno = environment;
  private http = inject(HttpClient);

  buscarPorCapital(txt: string) {
    txt = txt.toLowerCase();
    return this.http.get<IApiResp[]>(`${this.entorno.baseUrl}/capital/${txt}`)
      .pipe(
        catchError(error => {
          console.log("__CatchError en el servicio buscarPorCapital: ", error);
          return throwError(
            () => new Error("No se pudo cargar el listado de paises: " + error.error.message)
          );
        })
      );
  }

  buscarPorPais(txt: string) {
    txt = txt.toLowerCase();
    return this.http.get<IApiResp[]>(`${this.entorno.baseUrl}/name/${txt}`)
      .pipe(
        delay(1000),
        catchError(error => {
          console.log("__CatchError en el servicio buscarPorPais: ", error);
          return throwError(
            () => new Error("No se pudo cargar el listado de paises: " + error.error.message)
          );
        })
      );
  }


  // Devuelve el primer pais con el codigo indicado
  buscarPais(txt: string) {
    txt = txt.toLowerCase();
    return this.http.get<IApiResp[]>(`${this.entorno.baseUrl}/alpha/${txt}`)
      .pipe(
        delay(1000),
        map(resp => resp[0]),
        catchError(error => {
          console.log("__CatchError en el servicio buscarPais: ", error);
          return throwError(
            () => new Error("No se pudo cargar el pais: " + error.error.message)
          );
        })
      );
  }
}
