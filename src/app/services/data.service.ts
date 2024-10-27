import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl: string = 'https://localhost:44313'; 

  constructor(private http: HttpClient) { }

  // דוגמה לקריאת GET מהשרת
  getData(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`);
  }

  // דוגמה לקריאת POST לשרת
  postData(endpoint: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });


      return this.http.post(this.baseUrl+"/"+endpoint,JSON.stringify(data) , { headers });  }

      

  // דוגמה לקריאת PUT לשרת
  updateData(endpoint: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${endpoint}`, JSON.stringify(data));
  }

  // דוגמה לקריאת DELETE מהשרת
  deleteData(endpoint: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${endpoint}`);
  }
    // פונקציה לקבלת כל המקרים
    getAllProtocolEntries(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/Protocol`);
    }
  
    // פונקציה להוספת מקרה חדש
    postProtocolEntry(entry: any): Observable<any> {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json'
      });
      return this.http.post(`${this.baseUrl}/Protocol`, JSON.stringify(entry), { headers });
    }
}
