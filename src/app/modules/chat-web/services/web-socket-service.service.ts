import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketServiceService {
  private socket!: WebSocket;
  private messagesSubject!: Subject<any>;
  private url: string = 'ws://localhost:5000/';

  constructor() {
    this.socket = new WebSocket(this.url);
    this.messagesSubject = new Subject<any>();

    this.socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened', event);
    });

    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      this.messagesSubject.next(message);
    });

    this.socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed', event);
    });

    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket error', event);
    });

    this.socket.addEventListener('ping', (event) => {
      console.log('WebSocket ping', event);
    });
  }

  connect() {
    // Connect to the WebSocket
    if (this.socket.readyState === WebSocket.CLOSED) {
      this.socket = new WebSocket(this.url);
    }
  }

  disconnect() {
    // Disconnect from the WebSocket
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
  }

  get messages(): Observable<any> {
    return this.messagesSubject.asObservable();
  }

  sendMessage(message: any) {
    // Send message to the WebSocket
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.log('Socket is closed');
    }
  }
}
