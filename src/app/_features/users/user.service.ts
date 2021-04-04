import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { UtilityService } from "src/app/_shared/utility.service";
import { environment } from "src/environments/environment";
import { User } from "../../models/user.model";

@Injectable()
export class UserService {

    constructor(private http: HttpClient, private utilityService: UtilityService) { }

    getUsers(filter: {}) {
        const queryString = this.utilityService.objectToQueryString(filter);

        return this.http.get<User[]>(`${environment.API_BASE_URI}/users?${queryString}`, { observe: 'response' })
            .pipe(map(response => {
                return {
                    data: response.body,
                    count: +response.headers.get('X-Total-Count')
                };
            }));
    }

    addUser(user: User) {
        return this.http.post(`${environment.API_BASE_URI}/users`, user);
    }

    deleteUser(id: number) {
        return this.http.delete(`${environment.API_BASE_URI}/users/${id}`);
    }

    getUserById(id: number) {
        return this.http.get(`${environment.API_BASE_URI}/users/${id}`);
    }

    updateUser(user: User) {
        return this.http.put(`${environment.API_BASE_URI}/users/${user.id}`, user);
    }
}