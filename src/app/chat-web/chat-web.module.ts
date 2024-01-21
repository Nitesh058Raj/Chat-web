import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ChatWebRoutingModule } from './chat-web-routing.module';
import { ChatWebComponent } from './chat-web.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { WebSocketServiceService } from './services/web-socket-service.service';

@NgModule({
  declarations: [ChatWebComponent, ChatWindowComponent, UserAvatarComponent],
  imports: [CommonModule, ChatWebRoutingModule, HttpClientModule],
  exports: [ChatWebComponent, ChatWindowComponent, UserAvatarComponent],
  providers: [WebSocketServiceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatWebModule {}
