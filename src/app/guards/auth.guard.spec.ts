import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'isAuthenticated',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true and allow navigation when user is authenticated', () => {
      userService.isAuthenticated.and.returnValue(true);

      const canActivate = authGuard.canActivate();

      expect(canActivate).toBeTrue();
      expect(userService.isAuthenticated).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should return false and navigate to login page when user is not authenticated', () => {
      userService.isAuthenticated.and.returnValue(false);

      const canActivate = authGuard.canActivate();

      expect(canActivate).toBeFalse();
      expect(userService.isAuthenticated).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
