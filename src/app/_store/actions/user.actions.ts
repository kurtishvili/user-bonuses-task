import { Action } from '@ngrx/store'
import { User } from '../../models/user.model';

export enum EUserActions {
    GET_USERS_SUCCESS = '[USER] Get Success'
}

export class GetUsersSuccessAction implements Action {
    readonly type = EUserActions.GET_USERS_SUCCESS;
    constructor(public payload: User[]) { }
}

export type UserActions = GetUsersSuccessAction