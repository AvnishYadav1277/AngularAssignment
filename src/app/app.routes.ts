import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';

export const routes: Routes = [
    {
        path: 'employee',
        component: EmployeesComponent,

    },
    {
        path: 'employeedetails/:userId',
        component: EmployeedetailsComponent,

    }
];
