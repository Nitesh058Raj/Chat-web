import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from '../../../shared/interfaces/shared.model';
import { UserService } from '../../../shared/services/user.service';
import { WebSocketServiceService } from '../../services/web-socket-service.service';
import { ChatWindowComponent } from './chat-window.component';

describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;

  const mockUser: User = {
    name: 'John Doe',
    // Add other user properties as needed
  };

  const mockWebSocketService = {
    connect: jasmine.createSpy('connect'),
    disconnect: jasmine.createSpy('disconnect'),
    sendMessage: jasmine.createSpy('sendMessage'),
    messages: of({
      message: 'Test message',
      userName: 'John Doe',
      timeStamp: new Date().getTime(),
    }),
  };

  const mockUserService = {
    getUserDetails: jasmine
      .createSpy('getUserDetails')
      .and.returnValue(mockUser),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatWindowComponent],
      providers: [
        { provide: WebSocketServiceService, useValue: mockWebSocketService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call connect on ngOnInit', () => {
    expect(mockWebSocketService.connect).toHaveBeenCalled();
  });

  it('should call disconnect on ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(mockWebSocketService.disconnect).toHaveBeenCalled();
  });

  it('should send message', () => {
    const message = 'Hello, world!';
    component.sendMessage(message);

    expect(mockWebSocketService.sendMessage).toHaveBeenCalledWith({
      message,
      userName: mockUser.name,
      timeStamp: jasmine.any(Number),
    });
    expect(component.chatTab.nativeElement.value).toEqual('');
  });

  it('should not send a message if message is empty', async () => {
    const emptyMessage = '';
    await component.sendMessage(emptyMessage);

    expect(component.chatTab.nativeElement.value).toEqual('');
  });

  it('should send a message if message is not empty', () => {
    const nonEmptyMessage = 'Hello, world!';
    component.sendMessage(nonEmptyMessage);

    expect(mockWebSocketService.sendMessage).toHaveBeenCalledWith({
      message: nonEmptyMessage,
      userName: mockUser.name,
      timeStamp: jasmine.any(Number),
    });
    expect(component.chatTab.nativeElement.value).toEqual('');
  });

  it('should convert timestamp to date string', () => {
    const timestamp = new Date().getTime();
    const dateString = component.toDate(timestamp);
    expect(dateString).toEqual(jasmine.any(String));
  });

  it('should update messages on WebSocketService message', () => {
    const fackMessage = [
      {
        message: 'Test message',
        userName: 'John Doe',
        timeStamp: new Date().getTime(),
        isRight: false,
      },
    ];

    const initialMessagesCount = fackMessage.length;

    fackMessage.push({
      message: 'Test message',
      userName: 'John Doe',
      timeStamp: new Date().getTime(),
      isRight: false,
    });
    expect(fackMessage.length).toBeGreaterThan(initialMessagesCount);
  });

  it('should push a message from another user', () => {
    const mockResponse = {
      message: 'Test message',
      userName: 'Another User',
      timeStamp: new Date().getTime(),
    };

    const fackMessage = [
      {
        message: 'Test message',
        userName: 'John Doe',
        timeStamp: new Date().getTime(),
        isRight: true,
      },
    ];

    component['userDetails'].name = 'John Doe';
    component.ngOnInit();

    fackMessage.push({
      message: mockResponse.message,
      userName: mockResponse.userName,
      timeStamp: mockResponse.timeStamp,
      isRight: mockResponse.userName === component['userDetails'].name,
    });

    expect(component.messages.length).toBe(2);
    expect(component.messages[1].isRight).toBe(true);
    // Add other expectations as needed
  });
});
