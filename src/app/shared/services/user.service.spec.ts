import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user details', () => {
    const user = {
      name: 'Test User',
      email: 'testuser@mail.com',
    };
    service.setUserDetails(user);
    expect(service.getUserDetails()).toEqual(user);
  });
});
