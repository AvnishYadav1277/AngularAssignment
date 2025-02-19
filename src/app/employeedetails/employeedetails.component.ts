import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee } from './employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employeedetails',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './employeedetails.component.html',
  styleUrl: './employeedetails.component.css'
})
export class EmployeedetailsComponent implements OnInit {
  employeeForm: FormGroup;
  private httpClient = inject(HttpClient);
  userId: number | null = null;


  employeeData: Employee = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    roleId: 0,
    userId: 0
  };

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      roleId: ['', [Validators.required]],
      userId: []
    });
  }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

    this.httpClient.get(`http://localhost:5108/Users/getUsersById/${this.userId}`).subscribe({
      next: (resData) => {
        this.employeeForm.patchValue(resData);
      }
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;

      // Define headers (if needed)
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.httpClient.post('http://localhost:5108/Users/EditUser', employeeData, { headers }).subscribe({
        next: (response) => {
          console.log('Response:', response);
          alert('Employee added successfully!');
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Failed to add employee. Please try again.');
        }
      });

    } else {
      alert('Please fill all fields correctly.');
    }
  }

  onDelete() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const userId = this.employeeForm.get('userId')?.value;
    alert(userId)

    if (!userId) {
      alert('No user selected for deletion.');
      return;
    }

    if (confirm('Are you sure you want to delete this employee?')) {
      this.httpClient.delete(`http://localhost:5108/Users/DeleteUser/${this.userId}`, { headers }).subscribe({
        next: () => {
          alert('Employee deleted successfully.');
          this.employeeForm.reset();  // Clear the form after deletionßß
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          alert('Failed to delete employee. Please try again.');
        }
      });
    }
  }
}

