import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActionTypes, UserActions } from './user.actions';
export interface State extends fromRoot.State {
    user: UserState;
}

export interface UserState {
    maskUserName: boolean;
}

const initialState: UserState = {
    maskUserName: false
};

const getUserFeatureStateSelector = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(getUserFeatureStateSelector, state => state.maskUserName);

export function reducer(state = initialState, action: UserActions) {
    switch (action.type) {
        case UserActionTypes.MaskUserName:
            return {
                ...state,
                maskUserName: action.payload
            };
        default: return state;
    }
}