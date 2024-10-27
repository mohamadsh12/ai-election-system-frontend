import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen: boolean = false;

  navLinks = [
    { path: '/login', label: 'התחברות' },
    { path: '/results', label: 'תוצאות' },
    { path: '/statistics', label: 'סטטיסטיקות' },
    {path: '/admin', label: 'אדמין'}
  ];
  constructor(private router: Router) {}



  navigateTo(path: string) {
    this.router.navigate([path]);
    this.isMenuOpen = false;
  }
}
