import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UserLoginComponent } from './user-login';

// Minimal AuthService stub matching the used shape
class AuthServiceStub {
  // emulate login(email, password) returning an observable<boolean>
  login(email: string, password: string) {
    return of(true); // you can change to of(false) to test failure path
  }
}

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoginComponent, RouterTestingModule],
      providers: [
        { provide: 'AuthService', useClass: AuthServiceStub } // only if your component injects by token
        // If your AuthService is a class token, use:
        // { provide: AuthService, useClass: AuthServiceStub }
      ]
    })
    .overrideProvider( (window as any).AuthService, { useValue: new AuthServiceStub() } ) // not required in most setups
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
