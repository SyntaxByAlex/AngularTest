import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productSource = new BehaviorSubject<Product | null>(null);
  private headers = { 'authorId': '1' };

  currentProduct = this.productSource.asObservable();

  private readonly baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

  constructor(private http: HttpClient) { }

  public get(): Observable<Product[]> {
    const url = this.baseUrl;

    return this.http.get<Product[]>(url, { headers: this.headers });
  }


  changeProduct(product: Product) {
    this.productSource.next(product);
  }

  public post(body: Product): Observable<Product> {
    const url = this.baseUrl;
    return this.http.post<Product>(url, body, { headers: this.headers });
  }


  public put(body: Product): Observable<Product> {
    const url = this.baseUrl;
    return this.http.put<Product>(url, body, { headers: this.headers });
  }

  public delete(idProduct: string) {
    const url = this.baseUrl
    const params = {
      id: idProduct
    }
    return this.http.delete(url, { headers: this.headers, params, responseType: 'text' })
  }

  public verify(idProduct: string) {
    const url = `${this.baseUrl}/verification`
    const params = {
      id: idProduct
    }
    return this.http.get<boolean>(url, { headers: this.headers, params })
  }
}
