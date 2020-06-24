import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatDatePipe } from '../pipe/chat-date.pipe';

@NgModule({
  declarations: [
    ChatDatePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ChatDatePipe,
  ],
})
export class SharedModule { }
