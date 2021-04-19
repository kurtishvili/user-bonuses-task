import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from './user.service';
import { ConfirmationService } from 'primeng/api';
import { PaginatorModel } from '../../models/paginator.model';
import { Userfilter } from '../../models/user-filter.model';
import { AppState } from 'src/app/_store/app.state';
import { GetUsersSuccessAction } from 'src/app/_store/actions/user.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users$: Observable<User[]>;

  userFilter: Userfilter = {};
  paginator: PaginatorModel = new PaginatorModel(0, 10);



  constructor(
    private store: Store<AppState>,
    private userSerivce: UserService,
    private confirmationService: ConfirmationService) {

    this.users$ = this.store.select('users')
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onPaginate(event: { page: number, rows: number }) {
    this.paginator.pageSize = event.rows;
    this.paginator.pageNumber = event.page;

    this.getUsers();
  }

  private getUsers() {
    this.userFilter._page = this.paginator.pageNumber + 1;
    this.userFilter._limit = this.paginator.pageSize;

    this.userSerivce.getUsers(this.userFilter).subscribe(
      response => {
        this.store.dispatch(new GetUsersSuccessAction(response.data));

        this.paginator.totalRecords = response.count;
      });
  }

  deleteUser(id: number) {
    this.confirmationService.confirm({
      message: "Do you want to delete this record?",
      accept: () => {
        this.userSerivce.deleteUser(id).subscribe(
          response => {
            this.getUsers();
          });
      }
    });
  }

  filterUserList(filter: Userfilter) {
    this.userFilter = filter;

    this.getUsers();
  }
}