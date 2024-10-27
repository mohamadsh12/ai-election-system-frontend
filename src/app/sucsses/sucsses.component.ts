import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucsses',
  standalone: true,
  templateUrl: './sucsses.component.html',
  styleUrl: './sucsses.component.css'
})
export class SucssesComponent implements OnInit, OnDestroy {

  timeLeft: number = 10;
  private intervalId: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.timeLeft = 10;
        clearInterval(this.intervalId);
        console.log("this is happend in sucsses component")

        this.router.navigate(['/login']);  // הפניה לדף הלוגין לאחר 10 שניות
      }
    }, 1000);  // עדכון הטיימר כל שנייה
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);  // ניקוי ה-interval כאשר הקומפוננטה יוצאת מהמסך
    }
  }
}
