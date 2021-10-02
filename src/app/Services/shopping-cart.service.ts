import { Injectable } from '@angular/core';
import { ShoppingCartItem } from '../Models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shopping_cart_items: any[] = [];

  constructor() { }

  addProduct = (productInformation: ShoppingCartItem) => {
    let items = this.getShoppingCartItems();
    if(items){
      var currentItem = items.find(p => (p.product.id == productInformation.product.id
        && p.color.id == productInformation.color.id 
        && p.size.id == productInformation.size.id));
      if(currentItem){
        currentItem.orderAmount += productInformation.orderAmount;
        localStorage.setItem('shopping_cart', JSON.stringify(items))
      }
      else {
        this.shopping_cart_items.push(productInformation);
        localStorage.setItem('shopping_cart', JSON.stringify(this.shopping_cart_items));
      }
    }
     else {
      this.shopping_cart_items.push(productInformation);
      localStorage.setItem('shopping_cart', JSON.stringify(this.shopping_cart_items));
    }
  }

  getShoppingCartItems = (): ShoppingCartItem[] => {
    let items = localStorage.getItem('shopping_cart');
    return JSON.parse(items);
  }

  getCartLength = (): number => {
    let itemsFromCache = this.getShoppingCartItems();
    var cartLength = itemsFromCache? itemsFromCache.length:0;
    return cartLength;
  }

  // removerItem = (p) => {
  //   console.log('calling Remover', p);
  //   let items = this.getShoppingCartItems();

  //   const index = items.findIndex(item => item.id == p.id)
  //   if(index >= 0){
  //     console.log('hitting if')
  //     items.splice(index, 1);
  //     return localStorage.setItem('shopping_cart', JSON.stringify(items));
  //   }
  // }
}
