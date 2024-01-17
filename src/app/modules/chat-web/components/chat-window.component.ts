import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WebSocketServiceService } from '../services/web-socket-service.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  isRight: boolean = false;

  messages: any[] = [];

  @ViewChild('chatTab', { static: false }) chatTab!: ElementRef;

  constructor(private WebSocketService: WebSocketServiceService) {}

  sendMessage(message: string) {
    if (message === '') {
      return;
    }

    this.WebSocketService.sendMessage({
      message: message,
      userName: 'test',
      timeStamp: new Date().getTime(),
    });

    this.chatTab.nativeElement.value = '';
  }

  ngOnInit(): void {
    this.WebSocketService.connect();

    this.WebSocketService.messages.subscribe((response) => {
      this.messages.push({
        message: response.message,
        userName: response.userName,
        timeStamp: this.toDate(response.timeStamp),
        // TODO: Change this logic
        isRight: response.userName === 'test' ? false : true,
      });
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

  ngOnDestroy(): void {
    this.WebSocketService.disconnect();
  }
}
