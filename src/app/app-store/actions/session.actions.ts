import { createAction, props, union } from '@ngrx/store';
import { Session } from '../../class/chat';

export const loadSessions = createAction(
  '[Session] Load Sessions'
);

export const loadSessionsSuccess = createAction(
  '[Session] Load Sessions Success',
  (payload: { session: Session }) => ({ payload }),
);

export const loadSessionsFailure = createAction(
  '[Session] Load Sessions Failure',
  (payload: { error: any }) => ({ payload }),
);

export const loginSessions = createAction(
  '[Session] Login Sessions',
  (payload: { email: string, password: string }) => ({ payload }),
);

export const loginSessionsSuccess = createAction(
  '[Session] Login Sessions Success',
  (payload: { session: Session }) => ({ payload }),
);

export const loginSessionsFailure = createAction(
  '[Session] Login Sessions Failure',
  (payload: { error: any }) => ({ payload }),
);

export const logoutSessions = createAction(
  '[Session] Logout Sessions'
);

export const logoutSessionsSuccess = createAction(
  '[Session] Logout Sessions Success',
  (payload: { session: Session }) => ({ payload }),
);

export const logoutSessionsFailure = createAction(
  '[Session] Logout Sessions Failure',
  (payload: { error: any }) => ({ payload }),
);

const actions = union({
  loadSessions,
  loadSessionsSuccess,
  loadSessionsFailure,
  loginSessions,
  loginSessionsSuccess,
  loginSessionsFailure,
  logoutSessions,
  logoutSessionsSuccess,
  logoutSessionsFailure,
});

export type SessionUnionActions = typeof actions;
