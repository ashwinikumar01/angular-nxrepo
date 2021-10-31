import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    apiURLProducts = environment.apiUrl + 'products';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiURLProducts).pipe(
            map((res) => {
                return res.map((r) => {
                    return r;
                });
            })
        );
    }

    getProduct(productId: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
    }

    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.apiURLProducts, product);
    }

    updateProduct(productId: string, product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.apiURLProducts}/${productId}`, product);
    }

    deleteProduct(productId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
    }
}
