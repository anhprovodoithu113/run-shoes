import { Injectable } from '@angular/core';
import { ShoppingCartItem } from '../Models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  productInfors: ShoppingCartItem[] = [];
  constructor() { }

  addProduct = (productInformation: ShoppingCartItem) => {
    let items = this.getShoppingCartItems();
    if(items){
      if(items.color){
        this.productInfors.push(items);
      } else{
        this.productInfors = items;
      }

      var currentItem = this.productInfors.find(p => (p.product.id == productInformation.product.id
        && p.color.id == productInformation.color.id 
        && p.size.id == productInformation.size.id));
      if(currentItem){
        currentItem.orderAmount += productInformation.orderAmount;
        localStorage.setItem('shopping_cart', JSON.stringify(items))
      }
      else {
        this.productInfors.push(productInformation);
        localStorage.setItem('shopping_cart', JSON.stringify(this.productInfors));
      }
    }else {
      this.productInfors.push(productInformation);
      localStorage.setItem('shopping_cart', JSON.stringify(this.productInfors));
    }
  }

  getShoppingCartItems = (): any => {
    let items = localStorage.getItem('shopping_cart');
    return JSON.parse(items);
  }

  getCartLength = (): number => {
    let itemsFromCache = this.getShoppingCartItems();
    var cartLength = 0;
    if(!itemsFromCache){
      return cartLength;
    }
    if(itemsFromCache.color){
      cartLength = 1;
    } else{
      cartLength = itemsFromCache.length
    }
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
