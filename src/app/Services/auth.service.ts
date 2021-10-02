import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { RegisterModel } from '../Models/register-model';

const AUTH_API = "https://localhost:5001/api/authentication";
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse){
    let errorMessage = 'Unknown error!';
    if(error.error instanceof ErrorEvent){
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = error.error.detail;
    }
    Swal.fire(errorMessage);
    return throwError(errorMessage);
  }


  public login(username: string, password: string): Observable<any>{
    return this.httpClient.post(`${AUTH_API}/login`, {
      username,
      password
    }, httpOptions);
  }

  public register(username: string, email: string, password: string, confirmPassword: string): Observable<any>{
    return this.httpClient.post(`${AUTH_API}/register`,{
      username, email, password, confirmPassword
    }, httpOptions).pipe(retry(1), catchError(this.handleError));
  }
}
