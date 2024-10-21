import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductListComponent } from './features/product-list/product-list.component';
import { ProductStateService } from './features/product-list/product-state.service';
import { ProductService } from './core/services/product.service';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { LoadingService } from './core/services/loading.service';
import { HttpInterceptorService } from './core/interceptors/http.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    LoadingService,
    ProductStateService,
    { provide: HTTP_INTERCEPTORS, 
      useClass: HttpErrorInterceptor, 
      multi: true 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
