import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ChatWebRoutingModule } from './chat-web-routing.module';
import { ChatWebComponent } from './chat-web.component';
import { ChatWindowComponent } from './components/chat-window.component';

@NgModule({
  declarations: [ChatWebComponent, ChatWindowComponent],
  imports: [CommonModule, ChatWebRoutingModule, HttpClientModule],
  exports: [ChatWebComponent],
  providers: [],
})
export class ChatWebModule {}
