import { Component, OnInit } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title = 'Products';
 // products: Product[];
  products$: Observable<Product[]>;
  selectedProduct: Product;
  errorMsg: string;
  productsNb = 0;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }
  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }
  
  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl('/products/'+product.id);
  }

  constructor(
    private productService: ProductService,
    private router: Router) {
  }

   ngOnInit() {

    this.products$ = this
                      .productService
                      .products$
                      .pipe(
                        tap(products => this.productsNb = products.length),
                        catchError(
                          error => {
                            this.errorMsg = error;
                            return EMPTY;
                          }
                        )
                      );

    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     results => this.products = results
    //   )
  }

}
