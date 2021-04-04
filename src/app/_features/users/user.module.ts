import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserListComponent } from './users-list/users-list.component';
import { UserFilterComponent } from './users-filter/users-filter.component';
import { SharedModule } from '../../_shared/shared.module';
import { UserGuard } from './guards/user-profile.guard';
import { UserResolver } from './resolvers/user-profile.resolver';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/_store/reducers/user.reducer';
import { UserService } from './user.service';
import { UserBonusesComponent } from './user-profile/user-bonuses/user-bonuses.component';
import { UserDetailsComponent } from './user-profile/user-details/user-details.component';
import { BonusService } from './bonus.service';

@NgModule({
  declarations: [
    UserComponent,
    UserProfileComponent,
    UserListComponent,
    UserFilterComponent,
    UserBonusesComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature('users', userReducer)
  ],
  providers: [
    UserGuard,
    UserResolver,
    UserService,
    BonusService
  ]
})
export class UserModule { }