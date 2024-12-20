import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

class MockUserService {
  login() {
    // Simulate an ArrayBuffer response with JSON data
    const jsonResponse = JSON.stringify({ id: 'fake-token' });
    const arrayBuffer = new TextEncoder().encode(jsonResponse).buffer;
    return of(arrayBuffer); // Return the ArrayBuffer
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  let router: Router;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  // Test case 1: Component renders properly
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Error message displayed on empty input fields
  it('should show error message when login is clicked with empty fields', () => {
    const loginButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    loginButton.nativeElement.click();
    fixture.detectChanges();

    const emailErrors = component.loginForm.get('email')?.errors;
    const passwordErrors = component.loginForm.get('password')?.errors;

    expect(emailErrors).toBeTruthy();
    expect(passwordErrors).toBeTruthy();
    expect(emailErrors?.['required']).toBeTrue();
    expect(passwordErrors?.['required']).toBeTrue();
  });

   // Test case 3: API is called when form is valid
   it('should call login API on valid form submission', () => {
    spyOn(userService, 'login').and.callThrough();

    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.onLogin();
    fixture.detectChanges();

    expect(userService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  // // Test case 4: Navigation after successful login
  // it('should navigate to /addnote after successful login', () => {
  //   spyOn(userService, 'login').and.returnValue(of({ id: 'fake-token' }));
  //   component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });

  //   component.onLogin();
  //   fixture.detectChanges();

  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/addnote']);
  // });
    // Test case 4: Navigation after successful login
    it('should navigate to /addnote after successful login', () => {
      spyOn(userService, 'login').and.callThrough();
  
      component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
      component.onLogin();
      fixture.detectChanges();
  
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/addnote']);
    });

  // Test case 5: API not called if form is invalid
  it('should not call login API if form is invalid', () => {
    spyOn(userService, 'login');
    component.loginForm.setValue({ email: '', password: '' });

    component.onLogin();
    fixture.detectChanges();

    expect(userService.login).not.toHaveBeenCalled();
  });

});
