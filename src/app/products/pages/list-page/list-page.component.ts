import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { InputSearchDebouncedComponent } from '../../components/input-search-debounced/input-search-debounced.component';
import { DropdownMenuComponent } from '../../components/dropdown-menu/dropdown-menu.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { SqueletonComponent } from '../../components/squeleton/squeleton.component';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    CommonModule,
    InputSearchDebouncedComponent,
    ButtonComponent,
    DropdownMenuComponent,
    DialogComponent,
    HttpClientModule,
    SqueletonComponent],

  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {


  constructor(
    private productsService: ProductService,
    private router: Router,
  ) { }

  public products: Product[] = [];
  public displayedProducts: Product[] = [];
  public itemsPerPage: number = 5;
  public visible: boolean = false;
  public messageDelete: string = ''
  public productSelected?: Product;
  public isLoading: boolean = true;

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.productsService.get().pipe(
      catchError(err => {
        this.isLoading = false
        return EMPTY
      })
    ).subscribe(res => {
      this.products = res;
      this.updateDisplayedProducts();
      this.isLoading = false
    });
  }

  public searchDebounced(value: string) {
    if (value === '') {
      this.getProducts();
      return;
    }

    this.displayedProducts = this.displayedProducts.filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase())
    ).slice(0, this.itemsPerPage);
  }

  public updateDisplayedProducts() {
    this.displayedProducts = this.products.slice(0, this.itemsPerPage);
  }

  public onRecordsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = +selectElement.value;
    this.updateDisplayedProducts();
  }

  public goToAddProduct() {
    this.router.navigateByUrl('products/save');
  }

  public getMenuItems(product: Product) {
    return [
      {
        label: 'Editar',
        action: () => this.goToEditProduct(product)
      },
      {
        label: 'Eliminar',
        action: () => this.confirmDeleteProject(product)
      }
    ];
  }

  public goToEditProduct(product: Product) {
    this.productsService.changeProduct(product);
    this.router.navigateByUrl('products/edit');
  }

  public confirmDeleteProject(product: Product): void {
    this.productSelected = product;
    this.messageDelete = `¿Estás seguro de eliminar el producto ${product.name}?`
    this.visible = true
  }

  public deleteProduct(): void {
    this.productsService.delete(this.productSelected!.id).subscribe(() => {
      this.getProducts()
      this.toogleModal()
    })
  }

  public toogleModal() {
    this.visible = !this.visible
  }

}
