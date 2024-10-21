import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { ProductStateService } from './product-state.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productStateService: ProductStateService) {
    this.products$ = this.productStateService.products$;
  }

  ngOnInit(): void {}

  // Listen to window scroll events
  @HostListener('window:scroll', [])
  onScroll(): void {
    const pos = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    if (pos) {
      this.loadMoreProducts();
    }
  }

  loadMoreProducts(): void {
    this.productStateService.loadMoreProducts();
  }
}
