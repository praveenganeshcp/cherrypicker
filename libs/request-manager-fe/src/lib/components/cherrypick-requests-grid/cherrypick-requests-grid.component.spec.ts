import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CherrypickRequestsGridComponent } from "./cherrypick-requests-grid.component";

describe("CherrypickRequestsGridComponent", () => {
  let component: CherrypickRequestsGridComponent;
  let fixture: ComponentFixture<CherrypickRequestsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CherrypickRequestsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CherrypickRequestsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
