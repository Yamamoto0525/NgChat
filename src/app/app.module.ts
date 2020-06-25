import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
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
