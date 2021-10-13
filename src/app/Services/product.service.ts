import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CheckoutProductRequest } from '../Models/checkout-product-request';
import { ProductColor } from '../Models/product-color';
import { ProductStatus } from '../Models/product-status';
import { Products } from '../Models/products';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL: string = 'https://localhost:5001/api/products';

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) { }

  private handleError(error: HttpErrorResponse){
    let errorMessage = 'Unknown error!';
    if(error.error instanceof ErrorEvent){
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    Swal.fire({
      title: errorMessage,
      icon: 'error'
    });
    return throwError(errorMessage);
  }

  public getAllProducts(){
    var getProductAPI = `${this.SERVER_URL}/get-all-products`;
    return this.httpClient.get<Products[]>(getProductAPI).pipe(retry(1), catchError(this.handleError));
  }

  public getProductById(productId: number){
    var getproductByIdAPI = `${this.SERVER_URL}/product-details/${productId}`;
    return this.httpClient.get<any>(getproductByIdAPI).pipe(retry(1), catchError(this.handleError));
  }

  public getAllProductColors(productId: number){
    var getProductColorAPI = `${this.SERVER_URL}/get-colors-by-product/${productId}`;
    return this.httpClient.get<ProductColor[]>(getProductColorAPI).pipe(retry(1), catchError(this.handleError));
  }

  public getAllProductStatus(productColorId: number){
    var getProductStatusAPI = `${this.SERVER_URL}/get-product-statuses-by-color/${productColorId}`
    return this.httpClient.get<ProductStatus[]>(getProductStatusAPI).pipe(retry(1), catchError(this.handleError));
  }

  public getItemsFromCache(keyCache: string){
    let items = localStorage.getItem(keyCache);
    return JSON.parse(items);
  }

  public setItemsToCache(key, items: any){
    localStorage.setItem(key, JSON.stringify(items));
  }

  public checkoutProduct(item: CheckoutProductRequest){
    const token = this.tokenStorage.getToken().accessToken;
    var checkoutProductAPI = `${this.SERVER_URL}/checkout-products`;
    return this.httpClient.post<any>(checkoutProductAPI, item, {
      headers: {
        'Authorization': token
      }
    }).pipe(retry(1), catchError(this.handleError));
  }
}
