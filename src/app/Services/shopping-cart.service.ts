import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shopping_cart_items: any[] = [];

  constructor() { }

  addProduct = (product) => {
    let items = this.getShoppingCartItems();
    if(items){
      items.push(product);
      localStorage.setItem('shopping_cart', JSON.stringify(items))
    } else {
      this.shopping_cart_items.push(product);
      localStorage.setItem('shopping_cart', JSON.stringify(this.shopping_cart_items));
    }
  }

  getShoppingCartItems = () => {
    let items = localStorage.getItem('shopping_cart');
    return JSON.parse(items);
  }

  getCartLength = () => {
    let items = this.getShoppingCartItems();
    return items? this.getShoppingCartItems().length : 0;
  }

  getTotal = () => {
    let items = this.getShoppingCartItems();
    return items?.reduce((total, item) => total + item.price, 0)
  }

  removerItem = (p) => {
    console.log('calling Remover', p);
    let items = this.getShoppingCartItems();

    const index = items.findIndex(item => item.id == p.id)
    if(index >= 0){
      console.log('hitting if')
      items.splice(index, 1);
      return localStorage.setItem('shopping_cart', JSON.stringify(items));
    }
  }
}
