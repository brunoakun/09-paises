import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IApiResp } from '../interfaces/api-resp';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  entorno = environment;
  private http = inject(HttpClient);

  // Query para la busqueda por capital
  private queryCachePorCapital = new Map<string, IApiResp[]>
  private queryCachePorPais = new Map<string, IApiResp[]>
  private queryCachePorRegion = new Map<string, IApiResp[]>


  // Buscar por capital
  buscarPorCapital(buscarTxt: string): Observable<IApiResp[]> {
    buscarTxt = buscarTxt.toLowerCase().trim();

    // si ya existe esta consulta en el cache la devolvemos
    if (this.queryCachePorCapital.has(buscarTxt)) {
      return of(this.queryCachePorCapital.get(buscarTxt)!);
    }

    if (buscarTxt.length === 0) return of([]);
    console.log('__Llamadaa API buscarPorCapital() txt', buscarTxt);

    return this.http.get<IApiResp[]>(`${this.entorno.baseUrl}/capital/${buscarTxt}`)
      .pipe(
        tap(resp => this.queryCachePorCapital.set(buscarTxt, resp)),    // Guardar la consulta en el cache
        catchError(error => {
          console.log("__CatchError en el servicio buscarPorCapital: ", error);
          return throwError(
            () => new Error("No se pudo cargar el listado de paises: " + error.error.message)
          );
        })
      );
  }


  // buscar por país
  buscarPorPais(buscarTxt: string): Observable<IApiResp[]> {
    buscarTxt = buscarTxt.toLowerCase().trim();

    // si ya existe esta consulta en el cache la devolvemos
    if (this.queryCachePorPais.has(buscarTxt)) {
      return of(this.queryCachePorPais.get(buscarTxt)!);  // el 'of' devuelve un observable del objeto
    }

    if (buscarTxt.length === 0) return of([]);
    console.log('__Llamada API buscarPorPais() txt', buscarTxt);

    return this.http.get<IApiResp[]>(`${this.entorno.baseUrl}/name/${buscarTxt}`)
      .pipe(
        //delay(1000),
        tap(resp => this.queryCachePorPais.set(buscarTxt, resp)),    // Guardar la consulta en el cache
        catchError(error => {
          console.log("__CatchError en el servicio buscarPorPais: ", error);
          return throwError(
            () => new Error("No se pudo cargar el listado de paises: " + error.error.message)
          );
        })
      );
  }



  // buscar por región
  buscarPorRegion(buscarTxt: string): Observable<IApiResp[]> {
    buscarTxt = buscarTxt.toLowerCase().trim();

    // si ya existe esta consulta en el cache la devolvemos
    if (this.queryCachePorRegion.has(buscarTxt)) {
      return of(this.queryCachePorRegion.get(buscarTxt)!);  // el 'of' devuelve un observable del objeto
    }

    if (buscarTxt.length === 0) return of([]);
    console.log('__Llamada API buscarPorRegion() txt', buscarTxt);

    return this.http.get<IApiResp[]>(`${this.entorno.baseUrl}/region/${buscarTxt}`)
      .pipe(
        //delay(1000),
        tap(resp => this.queryCachePorRegion.set(buscarTxt, resp)),    // Guardar la consulta en el cache
        catchError(error => {
          console.log("__CatchError en el servicio buscarPorRegion: ", error);
          return throwError(
            () => new Error("No se pudo cargar el listado de paises: " + error.error.message)
          );
        })
      );
  }


  // Devuelve el primer pais con el codigo indicado
  buscarPais(buscarTxt: string): Observable<IApiResp> {
    buscarTxt = buscarTxt.toLowerCase().trim();

    if (buscarTxt.length === 0) return of();
    console.log('__Llamadaa API buscarPais() txt', buscarTxt);

    return this.http.get<IApiResp[]>(`${this.entorno.baseUrl}/alpha/${buscarTxt}`)
      .pipe(
        //  delay(1000),
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
