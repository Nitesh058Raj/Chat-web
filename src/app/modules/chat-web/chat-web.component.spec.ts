import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWebComponent } from './chat-web.component';

describe('ChatWebComponent', () => {
  let component: ChatWebComponent;
  let fixture: ComponentFixture<ChatWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatWebComponent]
    });
    fixture = TestBed.createComponent(ChatWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
