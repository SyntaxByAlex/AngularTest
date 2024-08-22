import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productSource = new BehaviorSubject<Product | null>(null);
  currentProduct = this.productSource.asObservable();

  private readonly baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

  constructor(private http: HttpClient) { }

  public get(): Observable<Product[]> {
    const url = this.baseUrl;

    const headers = { 'authorId': '1' };
    return this.http.get<Product[]>(url, { headers });
  }


  changeProduct(product: Product) {
    this.productSource.next(product);
  }

  public post(body: Product): Observable<Product> {
    const url = this.baseUrl;
    const headers = { 'authorId': '1' };
    return this.http.post<Product>(url, body, { headers });
  }


  public put(body: Product): Observable<Product> {
    const url = this.baseUrl;
    const headers = { 'authorId': '1' };
    return this.http.put<Product>(url, body, { headers });
  }

}
