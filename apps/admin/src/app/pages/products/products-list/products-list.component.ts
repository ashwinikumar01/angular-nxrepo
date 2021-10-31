import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@bluebits/products';

@Component({
    selector: 'admin',
    templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];
    constructor(private productsService: ProductsService) {}

    ngOnInit(): void {
        this._getProducts();
    }

    private _getProducts() {
        this.productsService.getProducts().subscribe((products) => {
            this.products = products;
        });
    }
}
