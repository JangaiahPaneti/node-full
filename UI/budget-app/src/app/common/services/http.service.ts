import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { LoginResponse } from '../models/login-res.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}
  registerUser(payload: User){
    return this.http.post(`${environment.apiUrl}/register`,payload);
  }
  login(payload: {email: string, password:string}){
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`,payload);
  }
}
