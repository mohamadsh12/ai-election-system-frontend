import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {
  @Output() loginSuccess = new EventEmitter<void>(); // EventEmitter לשליחת האירוע לאבא
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid && this.loginForm.value.username === 'admin' && this.loginForm.value.password === 'admin') {
      const { username, password } = this.loginForm.value;
      
      // הצגת הודעת הצלחה
      Swal.fire({
        title: 'הצלחה!',
        text: 'התחברת בהצלחה!',
        icon: 'success',
        confirmButtonText: 'אישור'
      }).then(() => {
        this.loginSuccess.emit(); // שליחת האירוע לאבא
      });
      
    } else {
      // הצגת הודעת כישלון
      Swal.fire({
        title: 'שגיאה',
        text: 'התחברות נכשלה. בדוק את הפרטים ונסה שוב.',
        icon: 'error',
        confirmButtonText: 'אישור'
      });
    }
  }
}
