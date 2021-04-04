import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Userfilter } from 'src/app/models/user-filter.model';

@Component({
  selector: 'app-user-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UserFilterComponent implements OnInit {

  @Output('onFilter')
  onFilter: EventEmitter<Userfilter> = new EventEmitter();

  genders: SelectItem[] = [
    { value: 1, label: "Male" },
    { value: 2, label: 'Female' }
  ]

  selectedGender: string;

  userFilterForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userFilterForm = this.fb.group({
      firstname: [],
      lastname: [],
      personalId: [],
      phoneNumber: [],
    })
  }

  onSubmit() {
    this.onFilter.emit(this.userFilterForm.value);
  }

  clearForm() {
    this.userFilterForm.reset();

    this.onFilter.emit(this.userFilterForm.value);
  }
}