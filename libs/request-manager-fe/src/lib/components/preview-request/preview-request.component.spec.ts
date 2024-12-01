import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PreviewRequestComponent } from "./preview-request.component";

describe("PreviewRequestComponent", () => {
  let component: PreviewRequestComponent;
  let fixture: ComponentFixture<PreviewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewRequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
