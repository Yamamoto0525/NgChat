import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// FormsModuleを削除
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module'; // 追加
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// ChatDatePipeを削除
import { ChatComponent } from './chat/chat.component';
import { HeaderComponent } from './header/header.component';; // 追加

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HeaderComponent, // 追加
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModuleを削除
    SharedModule, // 追加
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
