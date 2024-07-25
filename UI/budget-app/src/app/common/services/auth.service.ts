import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
  isLoggedIn(): boolean{
    return !!this.getToken();
  }

  logout(){
    sessionStorage.clear();
  }

  setToken(token: string){
    sessionStorage.setItem('token',token);
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

  setUser(user: User){
    const _user = btoa(JSON.stringify(user))
    sessionStorage.setItem('loggedInUser',_user);
  }

  getUser(): User{
    return JSON.parse(atob(sessionStorage.getItem('loggedInUser')!)) as User;
  }

  
}
