import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UserListComponent {

  defaultAvatarUrl: string = "https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"

  @Input()
  users: User[];

  @Output('onDelete')
  onDelete: EventEmitter<number> = new EventEmitter();

  deleteUser(id: number) {
    this.onDelete.emit(id);
  }
}
