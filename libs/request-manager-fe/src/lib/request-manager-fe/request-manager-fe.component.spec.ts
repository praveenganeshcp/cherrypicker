import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestManagerFeComponent } from './request-manager-fe.component';

describe('RequestManagerFeComponent', () => {
  let component: RequestManagerFeComponent;
  let fixture: ComponentFixture<RequestManagerFeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestManagerFeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestManagerFeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
