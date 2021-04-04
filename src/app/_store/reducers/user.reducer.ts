import { EUserActions, UserActions } from "../actions/user.actions";
import { User } from "../../models/user.model";

export function userReducer(state: User[] = [], action: UserActions) {
    switch (action.type) {
        case EUserActions.GET_USERS_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
}