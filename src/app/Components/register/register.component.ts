import { Component, OnInit } from '@angular/core';
import { RegisterModel } from 'src/app/Models/register-model';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null
  };
  isSuccessful=false;
  isSignUpFailed=false;
  errorMessage='';

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    const { username, email, password, confirmPassword } = this.form;
    
    this.authService.register(username, email, password, confirmPassword).subscribe(
      data => {
        this.isSuccessful=true;
        this.isSignUpFailed=false;
        Swal.fire({title:"Your registration is successful!",icon:'success',timer:1500}).then(() =>{
          window.location.href='http://localhost:4200/login';
        });
      },
      err =>{
        Swal.fire(err.error.message);
        this.isSignUpFailed=true;
      }
    )
  }
}
