import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';

@Component({
    selector: 'admin',
    templateUrl: './products-form.component.html'
})
export class ProductsFormComponent implements OnInit {
    form: any = FormGroup;
    isSubmitted = false;
    editmode = false;
    currentProductId: string = '';
    categories = [];
    imageDisplay: string | ArrayBuffer;

    constructor(
        private formBuilder: FormBuilder,
        private location: Location,
        private route: ActivatedRoute,
        private categoriesService: CategoriesService
    ) {
        this._initForm();
        this._getCategories();
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            isFeatured: [false]
        });
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((categories: any) => {
            this.categories = categories;
            console.log(this.categories);
        });
    }

    ngOnInit(): void {}

    onSubmit() {}

    onCancel() {
        this.location.back();
    }

    onImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.form.patchValue({ image: file });
            this.form.get('image').updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            };
            fileReader.readAsDataURL(file);
        }
    }

    get productForm() {
        return this.form.controls;
    }
}
