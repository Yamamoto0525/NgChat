import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Comment } from '../../class/chat';

// import { Chat } from './chat.model'; // 削除

export const loadChats = createAction(
  '[Chat/API] Load Chats',
  (payload: { chats: Comment[] }) => ({ payload }),
);

export const loadChatsSuccess = createAction(
  '[Chat/API] Load Chats Success',
  (payload: { chats: Comment[] }) => ({ payload }),
);

export const loadChatsFail = createAction(
  '[Chat/API] Load Chats Fail',
  (payload?: { error: any }) => ({ payload }),
);

export const addChat = createAction(
  '[Chat/API] Add Chat',
  (payload: { chat: any }) => ({ payload }),
);

export const updateChat = createAction(
  '[Chat/API] Update Chat',
  (payload: { chat: Update<Comment> }) => ({ payload }),
);

export const deleteChat = createAction(
  '[Chat/API] Delete Chat',
  (payload: { id: string }) => ({ payload }),
);

export const writeChatSuccess = createAction(
  '[Chat/API] Write Chat Success',
  (payload?: { chats: Comment[] }) => ({ payload }),
);

export const writeChatFail = createAction(
  '[Chat/API] Write Chat Fail',
  (payload?: { error: any }) => ({ payload }),
);

