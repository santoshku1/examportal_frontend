import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  };


  constructor(private snack: MatSnackBar, private login: LoginService) { }

  ngOnInit(): void { }

  formSubmit() {
    console.log("login form clicked")
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("User name is required", "", {
        duration: 2000,
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("Password is required", "", {
        duration: 2000,
      });
      return;
    }

    //request to server to generate token

    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
          console.log("success");
          console.log(data);
      },
      (error) => {
        console.log("error");
        console.log(error);
    }

    )

  }

}
