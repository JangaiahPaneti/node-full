import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { User } from '../../common/models/user.model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laytout',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    TagModule,
    ButtonModule,
    CardModule,
    AvatarModule,
    AvatarGroupModule,
    MenubarModule,
    InputTextModule,
    RippleModule,
    MenuModule
  ],
  templateUrl: './laytout.component.html',
  styleUrl: './laytout.component.scss'
})
export class LaytoutComponent implements OnInit {
  users: User[] = [];
  
  constructor(private http: HttpClient, private authService: AuthService, private router: Router){}
  ngOnInit(): void {
    this.http.get<User[]>( `${environment.apiUrl}/users`).subscribe((data) => {
      this.users = data;
    });
  }
}
