import { Component } from '@angular/core';
import { PartyService } from '../services/party.service';
import { Party } from '../interfaces/party';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { apiPaths } from '../mapPath/apiPaths.js';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  parties!: Party[];
  timeLeft: number = 60; // 60 שניות
  timerInterval: any;
  timerInterval2: any;

  subscription!:Subscription;
  constructor(
    private partyService: PartyService,
    private dataService: DataService,
    private router: Router
  ) {}
  navigateToLogin() {
    if (this.router.url.includes('home')) {
      this.router.navigate(['/login']); // מעבר לעמוד הלוגין רק אם הכתובת לא מכילה את "home"
    }
  }
  ngOnInit(): void {
    this.timeLeft = 60; // איפוס הטיימר בכל כניסה לדף הבית

    this.parties = this.partyService.getParties();
    this.startTimer();
  }


  startTimer() {
    this.timerInterval = setInterval(() => {
      
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timerInterval);
        clearInterval(this.timerInterval2);

        this.timeLeft = 60; // איפוס הטיימר בכל כניסה לדף הבית
        
        console.log("this is happend in home component 45")
        this.navigateToLogin()
      }
    }, 1000); // עדכון כל שנייה
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  resumeTimer() {
    this.startTimer();
  }

  
  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval); // שחרור הטיימר
    }
    if(this.timerInterval2){
      clearTimeout(this.timerInterval2);
    }
    this.timeLeft = 60; // איפוס הטיימר בכל כניסה לדף הבית

    this.subscription?.unsubscribe(); // שחרור המנויים למניעת זליגת זיכרון
  }


  selectParty(partyName: string) {
    Swal.fire({
      title: `האם אתה בטוח שאתה רוצה לבחור ב-${partyName}?`,
      showCancelButton: true,
      confirmButtonText: 'כן',
      cancelButtonText: 'לא',
    }).then((result) => {
      if (result.isConfirmed) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        const body2={
        
          "myUserId": user.userId,
           "voteId": 0,
          "party": partyName,
          "voteDate":  new Date().toISOString() // מייצר את התאריך והשעה הנוכחיים בפורמט ISO
        }


    this.subscription=    this.dataService
          .postData(apiPaths.vote, body2)
          .subscribe(
            (res: any) => {
              Swal.fire('תודה!', `בחרת ב-${partyName}`, 'success');
              //להעביר אותו לדף הצלחה
              this.router.navigate(['/success']);
            },
            (error) => {
              console.log(error.error); // תצוגת הודעה למשתמש
              if (error.status === 400 && error.error === "Vote limit reached.") {
                Swal.fire('שגיאה', ' הגעת למספר המקסימלי של הצבעות. מיד תועבר לדף הכניסה', 'error'); // תציג את ההודעה שהוחזרה מהשרת
           this.timerInterval2=     setTimeout(() => {
            console.log("this is happend in home component")
                  this.router.navigate(['/login']); // הפניה לדף הלוגין לאחר 3 שניות
                }, 1000); // 30
              } else {
                Swal.fire('שגיאה', 'התרחשה שגיאה בשרת, נסה שוב מאוחר יותר.', 'error');
              }
            }
          );
        ///this.
      } else {
        Swal.fire('הבחירה בוטלה');
      }
      this.resumeTimer(); // המשך הטיימר לאחר שהמודל נסגר
    });
  }
}
