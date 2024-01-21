import { TestBed } from '@angular/core/testing';
import { User } from '../interfaces/shared.model';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
    });
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should set and get user details', () => {
    const userDetails: User = {
      name: 'testUser',
    };

    userService.setUserDetails(userDetails);
    const retrievedUserDetails = userService.getUserDetails();

    expect(retrievedUserDetails).toEqual(userDetails);
  });

  it('should check authentication status', () => {
    expect(userService.isAuthenticated()).toBeFalse(); // Initially not authenticated

    const userDetails: User = {
      name: 'testUser',
    };

    userService.setUserDetails(userDetails);
    expect(userService.isAuthenticated()).toBeTrue(); // Authenticated after setting user details
  });
});
