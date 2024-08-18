import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CherrypickRequestsDashboardComponent } from './cherrypick-requests-dashboard.component';

describe('CherrypickRequestsDashboardComponent', () => {
  let component: CherrypickRequestsDashboardComponent;
  let fixture: ComponentFixture<CherrypickRequestsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CherrypickRequestsDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CherrypickRequestsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
