import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputSearchDebouncedComponent } from './input-search-debounced.component';


describe('InputTextComponent', () => {
  let component: InputSearchDebouncedComponent;
  let fixture: ComponentFixture<InputSearchDebouncedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSearchDebouncedComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputSearchDebouncedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
