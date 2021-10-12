import { Component, OnInit } from '@angular/core';
import { LoginReponseModel } from 'src/app/Models/login-reponse-model';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    var loginSessionStorage = this.tokenStorage.getToken()
    if(loginSessionStorage.accessToken){
      var expiredTimeSessionStorage = new Date(loginSessionStorage.expiredTime);
      var currentTime = new Date();
      if(currentTime < expiredTimeSessionStorage){
        this.redirectToHomePage();
      }
    }
  }

  onSubmit(): void{
    const {username, password}=this.form;

    this.authService.login(username, password).subscribe(
      (data: LoginReponseModel) => {
        this.tokenStorage.saveToken(data);
        Swal.fire({title: "Login successful!", icon:'success', timer: 1500}).then(() =>{
          this.redirectToHomePage();
        });
      },
      err => {
        Swal.fire(err.error.message);
      }
    )
  }

  redirectToHomePage(): void{
    window.location.href = 'http://localhost:4200/home';
  }
}
