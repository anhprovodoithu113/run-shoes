import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from 'src/app/Models/shopping-cart-item';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public productInfors: ShoppingCartItem[] = [];
  public subTotal: number = 0;
  public finalTotal: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.getItemFromCaches();
    this.calculateSubTotal();
  }

  private updateAmountFromCache(productId: number, colorId: number, sizeId: number, indexCurrentItem: number, isNegative: boolean){
    var updatedAmount = 0;
    var currentItem = this.productInfors.find(e => (e.product.id == productId
                                            && e.color.id == colorId
                                            && e.size.id == sizeId));
    updatedAmount = isNegative? currentItem.orderAmount - 1 : currentItem.orderAmount + 1;
    if(updatedAmount == 0){
      this.removeItemsFromCache(indexCurrentItem);
    }
    else if(updatedAmount > currentItem.size.amount){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `There is only ${currentItem.size.amount} items in the storage!`,
      });
    } else{
      currentItem.orderAmount = updatedAmount;
      localStorage.setItem('shopping_cart', JSON.stringify(this.productInfors))
    }

    this.calculateSubTotal();
  }

  private getItemFromCaches(){
    var productsFromCache = this.shoppingCartService.getShoppingCartItems();
    if(!productsFromCache){
      return;
    }
    if(productsFromCache.color){
      this.productInfors.push(productsFromCache);
    } else{
      this.productInfors = productsFromCache;
    }
  }

  private calculateTotal(orderAmount: number, productPrice: number){
    var discount = this.calculateDiscount(orderAmount);
    var totalPrice = productPrice*orderAmount;
    var totalPriceAfterDiscounted = totalPrice - ((totalPrice*discount)/100);
    return Number.parseFloat(totalPriceAfterDiscounted.toFixed(2));
  }

  private calculateDiscount(orderAmount: number){
    switch(true){
      case orderAmount > 3 && orderAmount <= 5: return 5;
      case orderAmount > 5 && orderAmount <= 10: return 7;
      case orderAmount > 10: return 10;
      default: return 0;
    }
  }

  private calculateSubTotal(){
    this.subTotal = 0;
    this.productInfors.forEach(element => {
      this.subTotal += this.calculateTotal(element.orderAmount, Number.parseFloat(element.product.defaultPrice));
    });
    this.subTotal = Number.parseFloat(this.subTotal.toFixed(2));
  }

  public calculateFinalTotal(event:any){
    this.finalTotal = this.subTotal + 5;
  }

  public removeItemsFromCache(itemIndex: number){
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteItem(itemIndex)
        Swal.fire(
          'Deleted!',
          'This item has been deleted.',
          'success'
        );
        this.calculateSubTotal();
      }
    });
  }

  private deleteItem(itemIndex: number){
    this.productInfors.splice(itemIndex, 1);
    localStorage.setItem('shopping_cart', JSON.stringify(this.productInfors));
  }
}
