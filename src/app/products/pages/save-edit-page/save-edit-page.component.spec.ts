import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEditPageComponent } from './save-edit-page.component';

describe('SaveEditPageComponent', () => {
  let component: SaveEditPageComponent;
  let fixture: ComponentFixture<SaveEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
