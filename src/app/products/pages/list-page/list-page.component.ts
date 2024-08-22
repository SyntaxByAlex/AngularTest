import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { InputSearchDebouncedComponent } from '../../components/input-search-debounced/input-search-debounced.component';
import { DropdownMenuComponent } from '../../components/dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CommonModule, InputSearchDebouncedComponent, ButtonComponent, DropdownMenuComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {


  constructor(
    private productsService: ProductsService,
    private router: Router,
  ) { }

  private products: Product[] = [];
  public displayedProducts: Product[] = [];
  public itemsPerPage: number = 5;




  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productsService.get().subscribe(res => {
      this.products = res;
      this.updateDisplayedProducts(); // Actualiza los productos mostrados al obtener los datos
    });
  }

  public searchDebounced(value: string) {
    if (value === '') {
      this.getProducts(); // Vuelve a obtener todos los productos si el valor está vacío
      return;
    }

    // Filtra los productos según el valor de búsqueda
    this.displayedProducts = this.displayedProducts.filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase())
    ).slice(0, this.itemsPerPage); // Limita los resultados a itemsPerPage
  }

  private updateDisplayedProducts() {
    // Actualiza los productos mostrados según itemsPerPage
    this.displayedProducts = this.products.slice(0, this.itemsPerPage);
  }

  // Método para manejar el cambio en el selector
  public onRecordsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = +selectElement.value; // Convierte el valor seleccionado a número
    this.updateDisplayedProducts(); // Actualiza los productos mostrados
  }

  public goToAddProduct() {
    this.router.navigateByUrl('products/save');
  }

  public getMenuItems(product: Product) {
    return [
      {
        label: 'Editar',
        action: () => this.goToEditProduct(product)
      }
    ];
  }

  public goToEditProduct(product: Product) {
    this.productsService.changeProduct(product);
    this.router.navigateByUrl('products/edit');
  }
}
