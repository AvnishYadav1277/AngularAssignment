import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface User {

  userId: BigInteger;
  firstName: string;
  lastName: string;
  emailAddress: string;
  roleName: string;

}

declare interface TableData {
  headerRow: string[];
  dataRows: User[];
}

@Component({
  selector: 'app-employees',
  imports: [NgFor],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {

  public tableData1!: TableData;

  private httpClient = inject(HttpClient);

  constructor(private router: Router) { }
  ngOnInit() {
    this.tableData1 = {
      headerRow: ['First Name', 'Last Name', 'Email Address', 'Role Name'],
      dataRows: []
    };

    this.httpClient.get('http://localhost:5108/Users/getAllUsers').subscribe({
      next: (resData) => {
        this.tableData1.dataRows.push(...(resData as User[]));
      }
    });
  }

  onRowClick(row: any) {
    this.router.navigate(['/employeedetails', row.userId]);
  }

  CreateEmployee() {
    this.router.navigate(['/employeedetails', 0]);
  }

}
