import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { UtilityService } from 'src/app/_shared/utility.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnChanges {

  defaultAvatarUrl: string = "https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg";

  @Input()
  user: User = {}

  @Output('onSaveUser')
  onSaveUser: EventEmitter<User> = new EventEmitter();

  genders: SelectItem[] = [
    { value: 1, label: "Male" },
    { value: 2, label: 'Female' }
  ]

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private utilityService: UtilityService) {
    this.initializeUserForm();
  }

  ngOnChanges(): void {
    this.userForm.patchValue(this.user);
  }

  initializeUserForm() {
    this.userForm = this.fb.group({
      id: ['',],
      firstname: ['',
        [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$')]
      ],
      lastname: ['',
        [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$')]
      ],
      gender: [, Validators.required],
      personalId: ['',
        [Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern(/^[0-9]\d*$/)]
      ],
      phoneNumber: ['',
        [Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern(/^[0-9]\d*$/)]
      ],
      avatarUrl: [''],
      legalAddress: this.fb.group({
        country: ['',
          [Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')]
        ],
        city: ['',
          [Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')]
        ],
        address: ['',
          [Validators.required]
        ]
      })
    })
  }

  onSubmitUser() {
    this.onSaveUser.emit({
      ...this.userForm.value,
      avatarUrl: this.user.avatarUrl
    })
  }

  deleteImg() {
    this.user.avatarUrl = undefined;
  }

  async uploadAvatar(event) {
    if (event.files && event.files.length > 0) {
      this.user.avatarUrl = await this.utilityService.fileToBase64(event.files[0])
    }
  }
}