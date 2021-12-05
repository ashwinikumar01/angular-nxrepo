import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor() {}

    initCartLocalStorage() {
        const initialCart = {
            items: []
        };
        const initialCartJSON = JSON.stringify(initialCart);
        localStorage.setItem(CART_KEY, initialCartJSON);
    }

    setCartItem(cartItem: CartItem): Cart {
        const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY));
        cart.items.push(cartItem);

        const cartJSON = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJSON);
        return cart;
    }
}
