import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

    constructor() {}

    initCartLocalStorage() {
        const cart: Cart = this.getCart();
        if (!cart) {
            const initialCart = {
                items: []
            };
            const initialCartJSON = JSON.stringify(initialCart);
            localStorage.setItem(CART_KEY, initialCartJSON);
        }
        // else {
        //     this.cart$.next(cart);
        // }
    }

    getCart() {
        const cartJsonString: string = localStorage.getItem(CART_KEY); //getting the string object {items: []}
        const cart: Cart = JSON.parse(cartJsonString); // parsing the string to object {items: []}
        return cart; //return the cart object {items: []}
    }

    setCartItem(cartItem: CartItem): Cart {
        const cart: Cart = this.getCart();
        const cartItemExist = cart.items.find((item) => item.productId === cartItem.productId);
        if (cartItemExist) {
            cart.items.map((item) => {
                if (item.productId === cartItem.productId) {
                    item.quantity = item.quantity + cartItem.quantity;
                    return item;
                }
            });
        } else {
            cart.items.push(cartItem);
        }

        const cartJson = JSON.stringify(cart);
        localStorage.setItem('cart', cartJson);
        this.cart$.next(cart);
        return cart;
    }

    deleteCartItem(productId: string) {
        const cart = this.getCart();
        const newCart = cart.items.filter((item) => item.productId !== productId);

        cart.items = newCart;

        const cartJsonString = JSON.stringify(cart);
        localStorage.setItem('cart', cartJsonString);

        this.cart$.next(cart);
    }
}
