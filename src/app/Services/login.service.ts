import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    let errorMessage = 'Unknown Error!';

    if(error.error instanceof ErrorEvent){
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else{
      // server-side error
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`
    }
    
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public login()
}
