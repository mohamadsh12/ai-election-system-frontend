import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { apiPaths } from '../mapPath/apiPaths.js';
import {StatisticsComponent} from '../statistics/statistics.component';
export interface Vote {
  voteId: number; // זהו המפתח הראשי
  myUserId: string; // מזהה המשתמש
  party?: string; // שם המפלגה, אופציונלי
  voteDate: Date; // תאריך ההצבעה
}
@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule,StatisticsComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent {
  partyResults: Vote[] = [];
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.dataService.getData(apiPaths.vote).subscribe((res: any) => {
      console.log(res);
      this.partyResults = res;
      this.calculateVotes();

    });
  }
  voteCountByParty: { [key: string]: number } = {};

  calculateVotes() {
    this.partyResults.forEach(vote => {
      const party = vote.party|| 'לא נבחרה מפלגה';
      if (this.voteCountByParty[party]) {
        this.voteCountByParty[party]++;
      } else {
        this.voteCountByParty[party] = 1;
      }
    });
  }
}
