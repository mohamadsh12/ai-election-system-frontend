import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProtocolComponent implements OnInit {
  newIncident: string = '';
  newIncidentTitle:string = '';
  place:string = '';
  isUrgent: boolean = false;
  incidents: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAllIncidents();
  }

  addIncident() {
    if (this.newIncident.trim() && this.newIncidentTitle.trim() && this.place.trim()) {
      const entry = {
        title: this.newIncidentTitle,
        place: this.place,
        description: this.newIncident,
        isUrgent: this.isUrgent
      };

      this.dataService.postProtocolEntry(entry).subscribe(
        response => {
          Swal.fire({
            title: 'הצלחה!',
            text: 'המקרה נוסף בהצלחה!',
            icon: 'success',
            confirmButtonText: 'אישור'
          }).then(() => {
            this.newIncident = '';
            this.newIncidentTitle = '';
            this.place = '';
            this.isUrgent = false;
            this.getAllIncidents();
          });
        },
        error => {
          Swal.fire({
            title: 'שגיאה',
            text: 'אירעה שגיאה בעת הוספת המקרה.',
            icon: 'error',
            confirmButtonText: 'אישור'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'שגיאה',
        text: 'אחד השדות לא מולאו, נא למלא את כל השדות.',
        icon: 'error',
        confirmButtonText: 'אישור'
      });
    }
  }

  getAllIncidents() {
    this.dataService.getAllProtocolEntries().subscribe(
      data => {
        this.incidents = data;
      },
      error => {
        console.error(error);
      }
    );
  }
}
