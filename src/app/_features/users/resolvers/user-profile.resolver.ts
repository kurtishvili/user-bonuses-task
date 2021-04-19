import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../user.service";
import { catchError, map, switchMap } from "rxjs/operators"
import { of } from "rxjs";
import { User } from "src/app/models/user.model";
import { BonusService } from "../bonus.service";

@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(private userService: UserService,
        private bonusService: BonusService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const emptyData = {
            user: {},
            bonuses: []
        }

        const id = +route.paramMap.get('id');

        if (id == 0) {
            return of(emptyData);
        }

        return this.userService.getUserById(id)
            .pipe(switchMap((user: User) => {
                return this.bonusService.getUserBonuses(id).pipe(map(bonuses => {
                    return {
                        user,
                        bonuses
                    }
                }))
            }))
            .pipe(catchError(error => of(emptyData)))
    }
}

