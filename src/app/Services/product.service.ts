import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ProductColor } from '../Models/product-color';
import { ProductStatus } from '../Models/product-status';
import { Products } from '../Models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL: string = 'https://localhost:5001/api/products';

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    let errorMessage = 'Unknown error!';
    if(error.error instanceof ErrorEvent){
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getAllProducts(){
    var getProductAPI = `${this.SERVER_URL}/get-all-products`;
    return this.httpClient.get<Products[]>(getProductAPI).pipe(retry(1), catchError(this.handleError));
  }

  public getAllProductColors(productId: number){
    var getProductColorAPI = `${this.SERVER_URL}/get-colors-by-product/${productId}`;
    return this.httpClient.get<ProductColor[]>(getProductColorAPI).pipe(retry(1), catchError(this.handleError));
  }

  public getAllProductStatus(productColorId: number){
    var getProductStatusAPI = `${this.SERVER_URL}/get-product-statuses-by-color/${productColorId}`
    return this.httpClient.get<ProductStatus[]>(getProductStatusAPI).pipe(retry(1), catchError(this.handleError));
  }
}
