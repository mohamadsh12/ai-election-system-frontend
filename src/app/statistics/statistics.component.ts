import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { apiPaths } from '../mapPath/apiPaths.js';
import { DataService } from '../services/data.service';
import { Input } from '@angular/core';
import { PartyService } from '../services/party.service';
interface Vote {
  voteId: number;
  myUserId: string;
  party: string;
  voteDate: string;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  votes: Vote[] = [];

  partyVoteCounts: { [key: string]: number } = {};
  votePercentages: number[] = [];
  parties: string[] = [];
  totalVotes: number = 0;
  uniqueVoters: Set<string> = new Set();
  totalUsers: number = 0; // מספר המשתמשים הכולל
  votedUsers: number = 0;
  notVotedUsers: number = 0;
  isLoading: boolean = true; // משתנה לאודר
  @Input() isFirstGraph: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dataService: DataService,
    private partyService: PartyService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dataService.getData(apiPaths.user).subscribe((res: any) => {
      this.totalUsers = res.length;
      console.log(this.totalUsers);

      this.dataService.getData(apiPaths.vote).subscribe((res: any) => {
        this.votes = res;
        this.isLoading = false; // הנתונים נטענו, הפסקת הלאודר
        this.calculatePartyVotes();
        this.calculateVoterStatistics();
        if (isPlatformBrowser(this.platformId)) {
          this.renderChart();
          this.renderVoterChart();
        }
      });
    });
  }

  calculatePartyVotes(): void {
    this.partyVoteCounts = {};
    this.totalVotes = this.votes.length;

    this.votes.forEach((vote) => {
      if (this.partyVoteCounts[vote.party]) {
        this.partyVoteCounts[vote.party]++;
      } else {
        this.partyVoteCounts[vote.party] = 1;
      }
    });
    const allParties = this.partyService.getParties();

    allParties.forEach((party) => {
      if (!this.partyVoteCounts[party.name]) {
        this.partyVoteCounts[party.name] = 0;
      }
    });

    this.parties = Object.keys(this.partyVoteCounts);
    this.votePercentages = this.parties.map(
      (party) => (this.partyVoteCounts[party] / this.totalVotes) * 100
    );
  }

  calculateVoterStatistics(): void {
    this.votes.forEach((vote) => {
      this.uniqueVoters.add(vote.myUserId);
    });

    this.votedUsers = this.uniqueVoters.size;
    this.notVotedUsers = this.totalUsers - this.votedUsers;
    console.log(this.totalUsers);
  }

  renderChart(): void {
    if (!this.isFirstGraph) {
      return;
    }

    const ctx = (
      document.getElementById('voteChart') as HTMLCanvasElement
    )?.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.parties,
          datasets: [
            {
              label: 'אחוזי הצבעה לפי מפלגה',
              data: this.votePercentages,
              backgroundColor: [
                '#4CAF50',
                '#FF5252',
                '#FF9800',
                '#2196F3',
                '#9C27B0',
              ],
              borderColor: [
                '#388E3C',
                '#D32F2F',
                '#F57C00',
                '#1976D2',
                '#7B1FA2',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function (value) {
                  return value + '%';
                },
              },
            },
          },
        },
      });
    }
  }

  renderVoterChart(): void {
    if (this.isFirstGraph) {
      return;
    }
    const ctx = (
      document.getElementById('voterChart') as HTMLCanvasElement
    )?.getContext('2d');
    if (ctx) {
      const votedPercentage = (this.votedUsers / this.totalUsers) * 100;
      const notVotedPercentage = 100 - votedPercentage;

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['הצביעו', 'לא הצביעו'],
          datasets: [
            {
              label: 'אחוזים',
              data: [votedPercentage, notVotedPercentage],
              backgroundColor: ['#4CAF50', '#FF5252'],
              borderColor: ['#388E3C', '#D32F2F'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const value = tooltipItem.raw as number;
                  return `${tooltipItem.label}: ${value.toFixed(2)}%`;
                },
              },
            },
          },
        },
      });
    }
  }
}
