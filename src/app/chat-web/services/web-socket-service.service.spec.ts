import { TestBed } from '@angular/core/testing';
import { WebSocketServiceService } from './web-socket-service.service';

describe('WebSocketServiceService', () => {
  let webSocketService: WebSocketServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebSocketServiceService],
    });

    webSocketService = TestBed.inject(WebSocketServiceService);
  });

  it('should be created', () => {
    expect(webSocketService).toBeTruthy();
  });

  it('should create a WebSocket', async () => {
    await webSocketService.connect();

    expect(webSocketService['socket']).toBeTruthy();
  });

  it('should not create a WebSocket if the socket is already open', async () => {
    await webSocketService.connect();

    const spy = spyOn(console, 'log');

    await webSocketService.connect();

    // You may need to adjust this based on your actual implementation
    expect(spy).toHaveBeenCalledWith('Socket is already open');
  });

  it('should connect to the WebSocket if the socket is closed', async () => {
    await webSocketService.connect();

    expect(webSocketService['socket'].readyState).toBe(0);
  });

  it('should disconnect from the WebSocket if the socket is open', async () => {
    await webSocketService.connect();

    await webSocketService.disconnect();

    expect(webSocketService['socket'].readyState).toBe(0);
  });

  it('should not disconnect from the WebSocket if the socket is already closed', async () => {
    await webSocketService.disconnect();

    expect(webSocketService['socket'].readyState).toBe(0);
  });

  it('should send a message if the socket is open', async () => {
    const message = { key: 'value' };

    const spy = spyOn(console, 'log');

    await webSocketService.connect();

    await webSocketService.sendMessage(message);

    // You may need to adjust this based on your actual implementation
    expect(spy).toHaveBeenCalledWith('Socket is already open');
  });

  it('should not send a message if the socket is closed', async () => {
    const message = { key: 'value' };

    const spy = spyOn(console, 'log');

    await webSocketService.disconnect();

    await webSocketService.sendMessage(message);

    expect(spy).toHaveBeenCalledWith('Socket is closed');
  });

  // Add more test cases as needed...
});
