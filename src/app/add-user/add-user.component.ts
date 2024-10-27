import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { apiPaths } from '../mapPath/apiPaths.js';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnDestroy {
  newUsername: string = '';
  imagesBase64: string[] = []; // מערך שמכיל את התמונות
  isLoading = false;
  subscribe!: Subscription;
  selectedNumber: number = 1;  // ברירת המחדל תהיה 1
  numbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1); // מספרים מ-1 עד 10
  userId:string='';
  constructor(private dataService: DataService) {}

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  addUser() {


   if(this.newUsername.length===0||this.imagesBase64.length===0||this.userId.length===0){
    alert("אחד מהשדות של הטופס לא תקינים נסה שוב");
  return
   }


    this.isLoading = true;
  
    let body: any;
  
    if (this.imagesBase64.length === 1) {
      // אם יש תמונה אחת בלבד
      body = {
        userId: this.userId,
        name: this.newUsername,
        age: 0,
        imageBase64: this.imagesBase64[0], // שימוש בשדה יחיד לתמונה
        annualVoteLimit: this.selectedNumber,
        faceEmbedding: [0],
        dot: 0,
      };
  
      console.log('שליחה עם תמונה בודדת:', body);
  
      this.subscribe = this.dataService.postData(apiPaths.user, body).subscribe(
        (res: any) => {
          console.log(res);
  
          alert('המשתמש נוסף בהצלחה');
          this.isLoading = false;
          this.resetForm(); // איפוס הטופס לאחר הוספת המשתמש
        },
        (error) => {
          console.error('Error:', error);
          alert('התרחשה שגיאה בשרת');
          if(error.error.message)
          alert(error.error.message);
          this.isLoading = false;
        }
      );
    } else {
      // אם יש יותר מתמונה אחת
      body = {
        userId: 'string',
        
        name: this.newUsername,
        age: 0,
        imageBase64: this.imagesBase64[0], // שימוש במערך של תמונות

        imagesBase64: this.imagesBase64, // שימוש במערך של תמונות
        annualVoteLimit: this.selectedNumber,
        faceEmbedding: [0],
        dot: 0,
      };
  
      console.log('שליחה עם מספר תמונות:', body);
  
      this.subscribe = this.dataService.postData(apiPaths.userMultipleImages, body).subscribe(
        (res: any) => {
          console.log(res);
  
          alert('המשתמש נוסף בהצלחה');
          this.isLoading = false;
          this.resetForm(); // איפוס הטופס לאחר הוספת המשתמש
        },
        (error) => {
          console.error('Error:', error);
          alert('התרחשה שגיאה בשרת');
          this.isLoading = false;
        }
      );
    }
  }
  resetForm() {
    this.newUsername = ''; // איפוס שם המשתמש
    this.imagesBase64 = []; // איפוס התמונות
    (document.querySelector('input[type="file"]') as HTMLInputElement).value = ''; // איפוס הקלט של הקובץ
  }

  onFilesSelected(event: any) {
    const files = event.target.files;
    this.imagesBase64 = []; // איפוס המערך בכל בחירה חדשה

    for (let file of files) {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const base64String = e.target.result.split(',')[1]; // חותך את החלק שלא קשור ומשאיר רק את ה-Base64
          this.imagesBase64.push(base64String); // מוסיף את התמונה למערך
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.imagesBase64.splice(index, 1); // הסרת תמונה מהמערך לפי האינדקס שלה
  }
}
