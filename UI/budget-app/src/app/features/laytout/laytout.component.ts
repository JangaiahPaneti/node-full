import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-laytout',
  standalone: true,
  imports: [CommonModule, DataViewModule,TagModule, ButtonModule, CardModule],
  templateUrl: './laytout.component.html',
  styleUrl: './laytout.component.scss'
})
export class LaytoutComponent implements OnInit {
  users: User[] = [];
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.http.get<User[]>('/api/user').subscribe((data) => {
      this.users = data;
    });
  }
}
