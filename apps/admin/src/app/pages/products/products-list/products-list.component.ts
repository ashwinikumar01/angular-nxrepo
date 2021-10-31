import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];

    constructor(
        private router: Router,
        private productsService: ProductsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this._getProducts();
    }

    private _getProducts() {
        this.productsService.getProducts().subscribe((products) => {
            this.products = products;
        });
    }

    getProduct(productId: string) {
        this.router.navigateByUrl(`products/form/${productId}`);
    }

    deleteProduct(producId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to Delete this Product?',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productsService.deleteProduct(producId).subscribe(
                    () => {
                        this._getProducts();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Product is deleted!'
                        });
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Product is not deleted!'
                        });
                    }
                );
            },
            reject: () => {}
        });
    }
}
