import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatWebRoutingModule } from './chat-web-routing.module';
import { ChatWebComponent } from './chat-web.component';
import { ChatWindowComponent } from './components/chat-window.component';

@NgModule({
  declarations: [ChatWebComponent, ChatWindowComponent],
  imports: [CommonModule, ChatWebRoutingModule],
  exports: [ChatWebComponent],
})
export class ChatWebModule {}
