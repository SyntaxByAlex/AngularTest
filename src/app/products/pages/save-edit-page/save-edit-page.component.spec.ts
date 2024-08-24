import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEditPageComponent } from './save-edit-page.component';
import { By } from '@angular/platform-browser';

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

  it('debería inicializar el formulario con valores predeterminados', () => {
    expect(component.projectForm.get('id')?.value).toBe('');
    expect(component.projectForm.get('name')?.value).toBe('');
    expect(component.projectForm.get('description')?.value).toBe('');
    expect(component.projectForm.get('logo')?.value).toBe('');
    expect(component.projectForm.get('date_release')?.value).toBeNull();
    expect(component.projectForm.get('date_revision')?.value).toBeNull();
  });

  it('debería validar el campo ID y mostrar el mensaje de error si es inválido', () => {
    const idControl = component.projectForm.get('id');
    idControl?.setValue('');
    idControl?.markAsTouched();
    fixture.detectChanges();
    const errorMsg = fixture.debugElement.query(By.css('.messageValidation')).nativeElement;
    expect(errorMsg.textContent).toContain('Este campo es requerido ');
  });

});
