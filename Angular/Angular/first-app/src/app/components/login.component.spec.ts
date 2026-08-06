import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { vi } from 'vitest';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form invalid when empty', () => {
    expect(component.loginForm.valid).toBe(false);
    expect(component.loginForm.get('username')?.hasError('required')).toBe(true);
    expect(component.loginForm.get('password')?.hasError('required')).toBe(true);
  });

  it('should navigate to transaction page on valid credentials', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');

    component.loginForm.setValue({
      username: 'vicky',
      password: '123456'
    });

    component.login();

    expect(component.loginForm.valid).toBe(true);
    expect(navigateSpy).toHaveBeenCalledWith(['/transaction']);
  });

  it('should not navigate on invalid credentials', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    const alertSpy = vi.spyOn(window, 'alert');

    component.loginForm.setValue({
      username: 'wrong',
      password: 'incorrect'
    });

    component.login();

    expect(component.loginForm.valid).toBe(true);
    expect(navigateSpy).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Invalid Username or Password');
  });
});
