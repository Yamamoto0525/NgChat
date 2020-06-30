import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ChatActions from './chat.actions';
import { Comment } from '../../class/chat';

export const chatsFeatureKey = 'chats';

export interface State extends EntityState<Comment> {
  loading: boolean;
}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>();

export const initialState: State = adapter.getInitialState({
  loading: false,
});


export const reducer = createReducer(
  initialState,
  on(ChatActions.addChat, (state) => {
    return { ...state, loading: true };
  }),
  on(ChatActions.updateChat, (state, action) => {
      return adapter.updateOne(action.payload.chat, { ...state, loading: true });
    }
  ),
  on(ChatActions.deleteChat, (state, action) => {
    return adapter.removeOne(action.payload.id, { ...state, loading: true });
  }),
  on(ChatActions.loadChats, (state) => {
    return { ...state, loading: true };
  }),
  on(ChatActions.loadChatsSuccess, (state, action) => {
    return adapter.upsertMany(action.payload.chats, { ...state, loading: false });
  }),
  on(ChatActions.loadChatsFail, (state) => {
    return { ...state, loading: false };
  }),
  on(ChatActions.writeChatSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(ChatActions.writeChatFail, (state) => {
    return { ...state, loading: false };
  }),
);

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
export const selectChat = createFeatureSelector<State>('chats');
export const getChatLoading = createSelector(selectChat, state => state.loading);
export const selectAllChats = createSelector(selectChat, selectAll);
