import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router"; // ייבוא RouterModule
import { AdminloginComponent } from "../adminlogin/adminlogin.component"; // ייבוא AdminloginComponent
import { AddUserComponent } from "../add-user/add-user.component"; // ייבוא AddUserComponent
import { ProtocolComponent } from "../protocol/protocol.component"; // ייבוא ProtocolComponent
import { UsersComponent } from "../users/users.component"; // ייבוא UsersComponent
@Component({
  selector: "app-admin",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AddUserComponent,
    ProtocolComponent,
    AdminloginComponent,
    UsersComponent,
  ],
  templateUrl: "./admin.component.html",
  styleUrl: "./admin.component.css",
})
export class AdminComponent {
  isLoggedIn = false; // משתנה שיגדיר אם המשתמש מחובר או לא

  navLinks = [
    { path: "/add-user", label: "הוספת משתמש" },
    { path: "/protocol", label: "פרוטוקול" },
    { path: "/adminlogin", label: "התחברות בתור מנהל" },
    { path: "/users", label: "משתמשים" },
  ];
  onLoginSuccess() {
    this.isLoggedIn = true; // עדכון המשתנה לאחר התחברות מוצלחת
  }
  selectedComponent: string = this.navLinks[0].path; // ברירת המחדל היא 'add-user'

  selectComponent(component: string) {
    console.log(component);
    this.selectedComponent = component;
  }
}
