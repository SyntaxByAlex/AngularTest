import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageComponent } from './list-page.component';
import { By } from '@angular/platform-browser';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el formulario de búsqueda y el botón de agregar', () => {
    const searchInput = fixture.debugElement.query(By.css('app-input-search-debounced'));
    const addButton = fixture.debugElement.query(By.css('app-button[labelButton="Agregar"]'));
    expect(searchInput).toBeTruthy();
    expect(addButton).toBeTruthy();
  });

  it('debería generar el menú desplegable para un producto', () => {
    const mockProduct = { id: '1', name: 'Producto 1', description: 'Descripción 1', logo: 'logo1.png', date_release: new Date(), date_revision: new Date() };

    const menuItems = component.getMenuItems(mockProduct);
    expect(menuItems).toContain(jasmine.objectContaining({ label: 'Editar' }));
    expect(menuItems).toContain(jasmine.objectContaining({ label: 'Eliminar' }));
  });

  it('debería alternar la visibilidad del modal', () => {
    component.toogleModal();
    expect(component.visible).toBeTrue();

    component.toogleModal();
    expect(component.visible).toBeFalse();
  });
});
