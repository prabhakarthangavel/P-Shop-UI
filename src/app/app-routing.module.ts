import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AuthComponent } from './auth/auth.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'products/', component: ProductsComponent },
  { path: 'products-bread/:item', component: ProductsComponent },
  { path: 'products-seasonings/:item', component: ProductsComponent },
  { path: 'products-fruits/:item', component: ProductsComponent },
  { path: 'products-vegetables/:item', component: ProductsComponent },
  { path: 'login', component: AuthComponent },
  { path: 'shopping_cart', component: ShoppingCartComponent },
  { path: '', redirectTo: 'products/', pathMatch: 'full' },
  { path: '**', redirectTo: 'products/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
