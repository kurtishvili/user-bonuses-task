import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { UserBonus } from 'src/app/models/user-bonus.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/_features/users/user.service';
import { BonusService } from '../bonus.service';
import { UserBonusesComponent } from './user-bonuses/user-bonuses.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User = {};
  bonuses: UserBonus[] = []

  @ViewChild('userBonuses')
  userBonusesRef: UserBonusesComponent;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bonusService: BonusService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      response => { 
        this.user = response.user.user
        this.bonuses = response.user.bonuses
      }
    )
    //  this.user = this.activatedRoute.snapshot.data.user.user;
    //  this.bonuses = this.activatedRoute.snapshot.data.user.bonuses;
  }

  saveUser(user: User) {
    if (!user.id) {
      this.userService.addUser(user).subscribe(
        response => {
          this.router.navigate(['users']);
        });
    } else {
      this.userService.updateUser(user).subscribe(
        response => {
          this.router.navigate(['users']);
        });
    }
  }

  addUserBonus(bonus: UserBonus) {
    bonus.userId = this.user.id;

    this.bonusService.addUserBonus(bonus).subscribe(
      response => {
        this.userBonusesRef.closeDialog();
        this.getBonuses();
      }
    )
  }

  getBonuses() {
    this.bonusService.getUserBonuses(this.user.id).subscribe(
      response => {
        this.bonuses = response;
      });
  }

  deleteBonus(id: number) {
    this.confirmationService.confirm({
      message: "Do you want to delete this record?",
      accept: () => {
        this.bonusService.deleteUserBonus(id).subscribe(
          response => {
            this.getBonuses();
          });
      }
    });
  }
}