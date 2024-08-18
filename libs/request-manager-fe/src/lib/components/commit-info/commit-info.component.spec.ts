import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommitInfoComponent } from './commit-info.component';

describe('CommitInfoComponent', () => {
  let component: CommitInfoComponent;
  let fixture: ComponentFixture<CommitInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommitInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
