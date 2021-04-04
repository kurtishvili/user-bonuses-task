import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserBonus } from "src/app/models/user-bonus.model";
import { environment } from "src/environments/environment";

@Injectable()
export class BonusService {

    constructor(private http: HttpClient) { }

    getUserBonuses(userId: number) {
        return this.http.get<UserBonus[]>(`${environment.API_BASE_URI}/bonuses?userId=${userId}`);
    }

    addUserBonus(bonus: UserBonus) {
        return this.http.post(`${environment.API_BASE_URI}/bonuses`, bonus);
    }

    deleteUserBonus(id: number) {
        return this.http.delete(`${environment.API_BASE_URI}/bonuses/${id}`);
    }
}