import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CherrypickRequestDetailComponent } from "./cherrypick-request-detail.component";

describe("CherrypickRequestDetailComponent", () => {
  let component: CherrypickRequestDetailComponent;
  let fixture: ComponentFixture<CherrypickRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CherrypickRequestDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CherrypickRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
