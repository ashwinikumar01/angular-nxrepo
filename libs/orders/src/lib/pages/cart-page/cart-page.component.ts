import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, CartItemDetailed, CartService } from '@bluebits/orders';
import { ProductsService } from '@bluebits/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrdersService } from '../../services/orders.service';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {
    cartItemsDetailed: CartItemDetailed[] = [];
    cartCount = 0;
    endSubs$: Subject<any> = new Subject();

    constructor(
        private router: Router,
        private cartService: CartService,
        private orderService: OrdersService
    ) {}

    ngOnInit(): void {
        this._getCartDetails();
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    private _getCartDetails() {
        this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
            this.cartItemsDetailed = [];
            this.cartCount = respCart?.items?.length ?? 0;
            respCart.items.forEach((cartItem) => {
                this.orderService.getProduct(cartItem.productId).subscribe((respProduct) => {
                    this.cartItemsDetailed.push({
                        product: respProduct,
                        quantity: cartItem.quantity
                    });
                });
            });
        });
    }

    backToShop() {
        this.router.navigate(['/products']);
    }

    deleteCartItem(cartItem: CartItemDetailed) {
        this.cartService.deleteCartItem(cartItem.product.id);
    }

    updateCartItemQuantity(event: any, cartItem: CartItemDetailed) {
        this.cartService.setCartItem({
            productId: cartItem.product.id,
            quantity: event.value
        });
    }
}
