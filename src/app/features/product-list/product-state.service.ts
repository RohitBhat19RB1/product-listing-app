import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product';
import { ProductService } from '../../core/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private productService: ProductService) {
    this.loadInitialProducts();
  }

  private loadInitialProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.productsSubject.next(products);
    });
  }

  public loadMoreProducts(): void {
    this.productService.getMoreProducts().subscribe((newProducts) => {
      const currentProducts = this.productsSubject.value;
      this.productsSubject.next([...currentProducts, ...newProducts]);
    });
  }
}
