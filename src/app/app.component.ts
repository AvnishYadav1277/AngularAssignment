import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeesComponent } from "./employees/employees.component";
import { SidebarComponent } from "./sidebar/sidebar.component";


@Component({
  selector: 'app-root',
  imports: [EmployeesComponent, SidebarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assignment';
}
