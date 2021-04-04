import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";

export class UserGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot) {
        return !isNaN(+route.paramMap.get('id'));
    }
}