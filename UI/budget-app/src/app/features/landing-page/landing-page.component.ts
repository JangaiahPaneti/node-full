import { Component, OnInit } from '@angular/core';
import { User } from '../../common/models/user.model';
import { MenuItem } from 'primeng/api/menuitem';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../common/services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    AvatarModule,
    AvatarGroupModule,
    MenubarModule,
    InputTextModule,
    RippleModule,
    MenuModule,
    ButtonModule,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit{
  items: MenuItem[] = [
    {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/'
    },
    {
        label: 'Features',
        icon: 'pi pi-star'
    },
  ];
  userOptions: MenuItem[] = [
    {
      label: 'Profile',
      command: () => {
        this.goToProfile();
      }
    },
    {
      label: 'Logout',
      command: () => {
        this.logout();
      }
    }
  ];
  loggedInUser?: User;
  loggedInUserName?: string;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.loggedInUser = this.authService.getUser();
    this.loggedInUserName = (this.loggedInUser.middleName) ? 
            `${this.loggedInUser.firstName} ${this.loggedInUser.middleName} ${this.loggedInUser.lastName}`:
            `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`;
  }

  goToProfile(){
    this.router.navigate(['/user-profile']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
