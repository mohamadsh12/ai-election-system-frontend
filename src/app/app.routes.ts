import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SucssesComponent } from './sucsses/sucsses.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ResultsComponent } from './results/results.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { AdminComponent } from './admin/admin.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent , pathMatch: 'full'},
  { path: 'success', component: SucssesComponent, pathMatch: 'full' },
   {path: 'admin', component: AdminComponent, pathMatch: 'full'},
  { path: 'add-user', component: AddUserComponent , pathMatch: 'full'},
  { path: 'results', component: ResultsComponent , pathMatch: 'full'},
  { path: 'statistics', component: StatisticsComponent, pathMatch: 'full' },
  { path: 'protocol', component: ProtocolComponent , pathMatch: 'full'},
];
