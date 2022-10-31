import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CartItem, CartService } from '@bluebits/orders';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    quantity = 1;

    constructor(
        private productService: ProductsService,
        private cartService: CartService,
        private route: ActivatedRoute
    ) {}

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
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: this.quantity
        };

        this.cartService.setCartItem(cartItem);
    }

    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
    }
}
