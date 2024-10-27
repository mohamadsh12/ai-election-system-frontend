import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { DataService } from '../services/data.service';
import { apiPaths } from '../mapPath/apiPaths.js';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
declare var clm: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  result: any;
  isLoading = false;
  private tracker: any;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLCanvasElement>;
  isCameraOpen = false;
  subscribe!: Subscription;
  private mediaStream: MediaStream | null = null;
  private captureInterval: any;
  private userFound = false; // משתנה כדי לבדוק אם כבר נמצא יוזר

  constructor(private dataService: DataService, private router: Router) {}
//מסירה את השירותים כשכבר לא צריך 
//כשהדף נסגר היא סוגרת 
  ngOnDestroy() {
    this.stopCamera();
    if (this.tracker) {
      this.tracker.stop();
    }
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.captureInterval) {
      clearInterval(this.captureInterval);
    }
    if (this.redirectTimeout) {
      clearTimeout(this.redirectTimeout);
    }
  }

  stopCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }
  }

  openCamera() {
    if (this.isBrowser()) {
      this.startVideo();
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream: MediaStream) => {
          this.mediaStream = stream;
          const videoElement = this.video.nativeElement;
          if (videoElement) {
            if ('srcObject' in videoElement) {
              videoElement.srcObject = stream;
            }
            videoElement.play();
            this.startAutoCapture(); // Start capturing images every 3 seconds
          }
        });
    }
  }

  isBrowser(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof navigator !== 'undefined' &&
      !!navigator.mediaDevices
    );
  }

  toggleCamera() {
    this.isCameraOpen = true;
    this.openCamera();
  }

  startVideo() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.video.nativeElement.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  }
  private redirectTimeout: any; // משתנה לשמירת מזהה ה-setTimeout

  startAutoCapture() {
    this.captureInterval = setInterval(() => {
      if (!this.isLoading && !this.userFound) {
        // נבדוק האם אנחנו ממתינים לתשובה או אם כבר נמצא יוזר
        this.captureImage();
      }
    }, 100); // Capture every 3 seconds
  }

  captureImage() {
    if (this.video && this.video.nativeElement) {
      const canvas = document.createElement('canvas');
      canvas.width = this.video.nativeElement.videoWidth;
      canvas.height = this.video.nativeElement.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(
          this.video.nativeElement,
          0,
          0,
          canvas.width,
          canvas.height
        );

        const imageData = canvas.toDataURL('image/png').split(',')[1]; // Convert to base64
        const body = imageData;

        this.isLoading = true;

        this.subscribe = this.dataService
          .postData(apiPaths.checkInDbImage, body)
          .subscribe(
            (data: any) => {
              this.result = data;
              this.isLoading = false;
              console.log('Data:', data);
              if (data.user) {
                this.userFound = true; // אם נמצא יוזר, נפסיק לשלוח בקשות נוספות
                localStorage.setItem('user', JSON.stringify(data.user));
                this.redirectTimeout =    setTimeout(() => {
                  console.log("this is happend in login component")

                  this.router.navigate(['/home']);
                }, 5000);
              }
            },
            (error: any) => {
              console.error('Error:', error);
              this.result = error.error;
              this.isLoading = false;
            }
          );
      }
    }
  }

  // initializeFaceDetection() {
  //   this.tracker = new clm.tracker();
  //   this.tracker.init();
  //   this.tracker.start(this.video.nativeElement);
  //   this.trackFace();
  // }
  // private intervalId: any;

  // trackFace() {
  //   const overlay = this.overlay.nativeElement;
  //   const context = overlay.getContext('2d');
  // }
}
