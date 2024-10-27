import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { apiPaths } from '../mapPath/apiPaths.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  loading: boolean = true;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData(apiPaths.user).subscribe(
      (res: any) => {
        this.users = res;
        this.loading = false; // מפסיק את הלודר כאשר הנתונים נטענים
      },
      (error) => {
        console.error('Error fetching data', error);
        this.loading = false; // מפסיק את הלודר גם במקרה של שגיאה
      }
    );
  }
}
