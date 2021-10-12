import { Injectable } from '@angular/core';
import { LoginReponseModel } from '../Models/login-reponse-model';

const ACCESS_TOKEN_KEY = 'accessToken';
const USERNAME_KEY = 'username';
const EXPREDTIME_KEY = 'expiredTime';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void{
    window.sessionStorage.clear();
  } 

  public saveToken(token:LoginReponseModel):void{
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.removeItem(EXPREDTIME_KEY);
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
    window.sessionStorage.setItem(USERNAME_KEY, token.username);
    window.sessionStorage.setItem(EXPREDTIME_KEY, token.expiredTime.toString());
  }

  public getToken():LoginReponseModel | null{
    var accessToken = window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
    var username = window.sessionStorage.getItem(USERNAME_KEY);
    var expiredTime = window.sessionStorage.getItem(EXPREDTIME_KEY);

    var reponse: LoginReponseModel = {
      accessToken,
      username,
      expiredTime
    };

    return reponse;
  }
}
