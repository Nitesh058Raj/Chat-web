import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAvatarComponent } from './user-avatar.component';

describe('UserAvatarComponent', () => {
  let component: UserAvatarComponent;
  let fixture: ComponentFixture<UserAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAvatarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('generateInitials', () => {
    it('should generate initials from a full name', () => {
      component.username = 'John Doe';
      component.ngOnInit();
      expect(component.initials).toBe('JD');
    });

    it('should generate initials from a single name', () => {
      component.username = 'John';
      component.ngOnInit();
      expect(component.initials).toBe('J');
    });
  });

  describe('generateBackgroundColor', () => {
    it('should generate a default background color if no username is provided', () => {
      component.username = '';
      component.ngOnInit();
      expect(component.backgroundColor).toBe('#007bff');
    });

    it('should generate a valid background color', () => {
      component.username = 'John Doe';
      // Manually set a value for hashCode, since it's private and not accessible
      spyOn(component as any, 'hashCode').and.returnValue(123);
      component.ngOnInit();
      expect(component.backgroundColor).toBeTruthy();
    });
  });

  describe('hashCode', () => {
    it('should generate a hash code', () => {
      const hash = component.hashCode('John Doe');
      expect(hash).toBeTruthy();
      expect(typeof hash).toBe('number');
    });

    it('should generate different hash codes for different inputs', () => {
      const hash1 = component.hashCode('John Doe');
      const hash2 = component.hashCode('Jane Doe');
      expect(hash1).not.toEqual(hash2);
    });
  });
});
