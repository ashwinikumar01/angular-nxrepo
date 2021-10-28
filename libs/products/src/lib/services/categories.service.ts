import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>('http://localhost:3000/api/v1/categories').pipe(
            map((res) => {
                return res.map((r) => {
                    return r;
                });
            })
        );
    }

    getCategory(categoryId: string): Observable<Category> {
        return this.http.get<Category>(`http://localhost:3000/api/v1/categories/${categoryId}`);
    }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>('http://localhost:3000/api/v1/categories', category);
    }

    updateCategory(categoryId: string, category: Category): Observable<Category> {
        return this.http.put<Category>(
            `http://localhost:3000/api/v1/categories/${categoryId}`,
            category
        );
    }

    deleteCategory(categoryId: string): Observable<Object> {
        return this.http.delete<Object>(`http://localhost:3000/api/v1/categories/${categoryId}`);
    }
}
