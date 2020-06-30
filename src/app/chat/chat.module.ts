import { NgModule } from '@angular/core';
import { ChatRoutingModule } from './chat-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './chat.component';
import { StoreModule } from '@ngrx/store';
import * as fromChat from './store/chat.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChatEffects } from './store/chat.effects';


@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    SharedModule,
    ChatRoutingModule,
    StoreModule.forFeature(fromChat.chatsFeatureKey, fromChat.reducer),
    EffectsModule.forFeature([ChatEffects]),
  ],
})
export class ChatModule {
}
