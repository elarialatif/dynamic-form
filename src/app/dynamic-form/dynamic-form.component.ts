import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  animations: [
    trigger('fieldAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('300ms', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate('300ms', style({ opacity: 0, height: 0 })),
      ]),
    ])
  ],
})
export class DynamicFormComponent implements OnInit {
  userForm: FormGroup;
  users: any[] = [];
  userData: any[] = [];
  tableColumns: string[] = ['name', 'age', 'email'];
  isInputValid: boolean = true;
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.users.push({});
    this.initTable();
  }

  onSubmit(): void {
    if(this.userForm.valid){
      console.log(this.userForm.value);
      const userData = this.userForm.value;
      this.userData.push(userData);

      this.tableColumns = Object.keys(userData);

      // Clear the form after submission
      this.userForm.reset();
    }else {
      this.isInputValid = false;
    }
  }
  deleteUser(index: number): void {
    this.userData.splice(index, 1);
  }

  initTable(): void {
    this.userData.push({ name: 'John', age: 30, email: 'john@example.com' });
    this.userData.push({ name: 'Alice', age: 25, email: 'alice@example.com' });
  }

}
