import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatWebComponent } from './chat-web.component';

@NgModule({
  declarations: [ChatWebComponent],
  imports: [CommonModule],
  exports: [ChatWebComponent],
})
export class ChatWebModule {}
