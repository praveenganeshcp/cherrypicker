import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CreateCherrypickRequestComponent } from "./create-cherrypick-request.component";

describe("CreateCherrypickRequestComponent", () => {
  let component: CreateCherrypickRequestComponent;
  let fixture: ComponentFixture<CreateCherrypickRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCherrypickRequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCherrypickRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
