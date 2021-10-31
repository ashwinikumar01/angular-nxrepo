import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;
    editmode = false;
    currentCategoryID: string;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#fff']
        });

        this._checkEditMode();
    }

    onSubmit() {
        const category: Category = {
            id: this.currentCategoryID,
            name: this.categoryForm.name.value,
            icon: this.categoryForm.icon.value,
            color: this.categoryForm.color.value
        };
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }

        if (this.editmode) {
            this._updateCategory(category);
        } else {
            this._addCategory(category);
        }
    }

    private _updateCategory(category: Category) {
        this.categoriesService.updateCategory(this.currentCategoryID, category).subscribe(
            (category: Category) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Category ${category.name} is Updated!`
                });
                timer(1000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Category is not updated!'
                });
            }
        );
    }

    private _addCategory(category: Category) {
        this.categoriesService.createCategory(category).subscribe(
            (category: Category) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Category ${category.name} is created!`
                });
                timer(1000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Category is not created!'
                });
            }
        );
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editmode = true;
                this.currentCategoryID = params.id;
                this.categoriesService.getCategory(params.id).subscribe((category) => {
                    this.categoryForm.name.setValue(category.name);
                    this.categoryForm.icon.setValue(category.icon);
                    this.categoryForm.color.setValue(category.color);
                });
            }
        });
    }

    onCancel() {
        this.location.back();
    }

    get categoryForm() {
        return this.form.controls;
    }
}
