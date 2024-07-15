import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../common/services/http.service';
import { AuthService } from '../../common/services/auth.service';
import { LoginResponse } from '../../common/models/login-res.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PasswordModule,
    CardModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
});
  constructor(private fb: FormBuilder,
    private http: HttpService,
    private authService: AuthService,
    private router: Router
  ){
    if(this.authService.isLoggedIn()) this.redirectToHome();
  }

  onSubmit(){
    this.http.login(this.loginForm.value).subscribe((data: LoginResponse) => {
      if(data.status === 'success'){
        this.authService.setToken(data.data.accessToken)
        this.redirectToHome()
      }
      
    })
  }
  private redirectToHome(){
    this.router.navigate(['/']);
  }
}
