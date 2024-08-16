import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFeComponent } from './auth-fe.component';

describe('AuthFeComponent', () => {
  let component: AuthFeComponent;
  let fixture: ComponentFixture<AuthFeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
