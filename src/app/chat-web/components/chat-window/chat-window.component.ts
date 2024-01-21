import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from '../../../shared/interfaces/shared.model';
import { UserService } from '../../../shared/services/user.service';
import { MessageInterface } from '../../interfaces/chat-web.model';
import { WebSocketServiceService } from '../../services/web-socket-service.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  isRight: boolean = false;

  userDetails!: User;
  messages: MessageInterface[] = [];

  @ViewChild('chatTab', { static: false }) chatTab!: ElementRef;
  @ViewChild('messagesContainer', { static: false })
  messagesContainer!: ElementRef;

  constructor(
    private WebSocketService: WebSocketServiceService,
    private UserService: UserService
  ) {
    this.userDetails = this.UserService.getUserDetails();
  }

  sendMessage(message: string) {
    if (message === '' || message.trim() === '') {
      this.chatTab.nativeElement.value = '';
      return;
    } else {
      this.WebSocketService.sendMessage({
        message: message,
        userName: this.userDetails.name,
        timeStamp: new Date().getTime(),
      });
      this.chatTab.nativeElement.value = '';
    }
  }

  ngOnInit(): void {
    this.WebSocketService.connect();

    this.WebSocketService.messages.subscribe((response) => {
      this.messages.push({
        message: response.message,
        userName: response.userName,
        timeStamp: this.toDate(response.timeStamp),
        isRight: response.userName === this.userDetails.name,
      });

      this.scrollMessagesContainerToBottom();
    });
  }

  toDate(timestamp: number) {
    const date = new Date(timestamp);
    const timeString = date.toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return timeString;
  }

  scrollMessagesContainerToBottom() {
    try {
      if (!this.messagesContainer) {
        throw new Error('Messages container not found');
      }
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  ngAfterViewChecked(): void {
    this.scrollMessagesContainerToBottom();
  }

  ngOnDestroy(): void {
    this.WebSocketService.disconnect();
  }
}
