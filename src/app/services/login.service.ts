import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  //get current user
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData: any) {

    return this.http.post(`${baseUrl}/generate-token`, loginData)

  }

  //login user: set token in local stoarge
  public loginUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }

  //isLogin :user is logged in or not
  public isLoggedIn(){
    let tokenStr=localStorage.getItem("token")
    if(tokenStr==undefined || tokenStr==''|| tokenStr==null){
               return false;
    }else{
      return true;
    }
  }

  //logout: remove token from local storage

  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");


    return true;
  }

  //get token 
public getToken(){
  return localStorage.getItem("token");
}

//set userDetails
public setUser(user:any){
  localStorage.setItem('user',JSON.stringify(user));
}

//get userDetails

public getUser(){
  let userStr=localStorage.getItem("user");
  if(userStr !=null){
    return JSON.parse(userStr);
  }else{
    this.logout();
    return null;
  }
}

//get USER Role
public getUserRole(){
  let user=this.getUser();
  return user.authorities[0].authority;
}
  
}
