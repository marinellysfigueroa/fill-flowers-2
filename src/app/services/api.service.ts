import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Response } from '../models/response';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Block } from '../models/block';
import {Variety} from "../models/variety";
import {InventoryFiltered} from "../models/inventory-filtered";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_path = 'https://fillcoflowers.com/restapi/v3/getInventory';
  base_path_block = 'https://fillcoflowers.com/restapi/v3/getBlock';
  base_path_variety = 'https://fillcoflowers.com/restapi/v3/getVariety';
  base_path_inventory = 'https://fillcoflowers.com/restapi/v3/getInventoryFiltered';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  getList(): Observable<Response> {
    return this.http
      .get<Response>(this.base_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  getBlocks(): Observable<Block> {
    return this.http
        .get<Block>(this.base_path_block)
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }
  getVariety(): Observable<Variety> {
    return this.http
        .get<Variety>(this.base_path_variety)
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }

  getInventoryFiltered(codigo_bloque:string,codigo_variedad:string,fecha_inicio:string,fecha_fin:string): Observable<InventoryFiltered> {
    return this.http
        .get<InventoryFiltered>(this.base_path_inventory+'?codigo_bloque='+codigo_bloque+'&codigo_variedad='+codigo_variedad+'&fecha_inicio='+fecha_inicio+'&fecha_fin='+fecha_fin)
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }


}
