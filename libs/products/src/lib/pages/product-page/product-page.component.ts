import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
    product: Product;
    endsubs$: Subject<any> = new Subject();
    quantity: number = 0;

    constructor(private productService: ProductsService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            if (params.id) {
                this._getProduct(params.id);
            }
        });
    }

    private _getProduct(id: string) {
        this.productService
            .getProduct(id)
            .pipe(takeUntil(this.endsubs$))
            .subscribe((resProduct) => {
                this.product = resProduct;
            });
    }

    addProductToCart() {
      
    }

    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
    }
}
