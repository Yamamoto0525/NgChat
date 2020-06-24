import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 追加

import { ChatDatePipe } from '../pipe/chat-date.pipe'; // 追加

@NgModule({
  declarations: [
    ChatDatePipe, // 追加
  ],
  imports: [
    CommonModule,
    FormsModule, // 追加
  ],
  exports: [  // 追加
    CommonModule,
    FormsModule,
    ChatDatePipe,
  ],
})
export class SharedModule { }
