import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FaceRecognitionService {
  private worker!: Worker;

  constructor() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./face-recognition.worker', import.meta.url));
    }
  }

  recognizeFaces(imageData: ImageData, modelPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.worker.onmessage = ({ data }) => resolve(data);
      this.worker.onerror = (err) => reject(err);

      this.worker.postMessage({ imageData, modelPath });
    });
  }
}
