import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];
    categories: Category[] = [];
    isCategoryPage: boolean;

    constructor(
        private prodService: ProductsService,
        private categoriesService: CategoriesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
            params.categoryid ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
        });
        // this._getProducts();
        this._getCategories();
    }

    _getProducts(categoriesFilter?: string[]) {
        this.prodService.getProducts(categoriesFilter).subscribe((resProducts) => {
            this.products = resProducts;
        });
    }

    _getCategories() {
        this.categoriesService.getCategories().subscribe((resCategories) => {
            this.categories = resCategories;
        });
    }

    categoryFilter() {
        const selectedCategories = this.categories
            .filter((category) => category.checked)
            .map((category) => category.id);
        console.log(selectedCategories);

        this._getProducts(selectedCategories);
    }
}
