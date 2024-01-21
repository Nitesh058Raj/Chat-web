import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'setUserDetails',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      imports: [ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    component.ngOnInit();

    expect(component.loginForm).toBeDefined();
    expect(component.userName).toBeDefined();
  });

  it('should navigate to chat-window on successful login', () => {
    const username = 'testUser';
    component.ngOnInit();
    component.loginForm.patchValue({ userName: username });

    component.login();

    expect(userService.setUserDetails).toHaveBeenCalledWith({ name: username });
    expect(router.navigate).toHaveBeenCalledWith(['/chat-window']);
  });

  it('should not navigate on login with invalid form', () => {
    component.ngOnInit();

    component.login();

    expect(userService.setUserDetails).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not navigate on login with empty username', () => {
    component.ngOnInit();
    component.loginForm.patchValue({ userName: '' });

    component.login();

    expect(userService.setUserDetails).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
