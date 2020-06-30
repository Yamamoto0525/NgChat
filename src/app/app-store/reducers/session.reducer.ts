import { createReducer, on } from '@ngrx/store';
import { Session } from '../../class/chat';
import * as SessionActions from '../actions/session.actions';

export const sessionFeatureKey = 'session';

export interface State {
  loading: boolean;
  session: Session;
}

export const initialState: State = {
  loading: false,
  session: new Session(),
};


export const reducer = createReducer(
  initialState,
  on(SessionActions.loadSessions, state => ({ ...state, loading: true })),
  on(SessionActions.loadSessionsSuccess, (state, action) => ({ ...state, loading: false, session: action.payload.session })),
  on(SessionActions.loadSessionsFailure, state => ({ ...state, loading: false })),
  on(SessionActions.loginSessions, state => ({ ...state, loading: true })),
  on(SessionActions.loginSessionsSuccess, (state, action) => ({ ...state, loading: false, session: action.payload.session })),
  on(SessionActions.loginSessionsFailure, state => ({ ...state, loading: false })),
  on(SessionActions.logoutSessions, state => ({ ...state, loading: true })),
  on(SessionActions.logoutSessionsSuccess, () => initialState),
  on(SessionActions.logoutSessionsFailure, state => ({ ...state, loading: false })),
);

export const getSessionLoading = (state: State) => state.loading;
export const getSessionData = (state: State) => state.session;
