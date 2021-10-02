import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductColor } from 'src/app/Models/product-color';
import { Products } from 'src/app/Models/products';
import { ShoppingCartItem } from 'src/app/Models/shopping-cart-item';
import { NationalFlagProductService } from 'src/app/Services/national-flag-product.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public productInfors: ShoppingCartItem[];
  public subTotal: number = 0;
  public finalTotal: number = 0;

  constructor(private shoppingCartService: ShoppingCartService,
    private flagService: NationalFlagProductService) { }

  ngOnInit(): void {
    this.getItemFromCaches();
    this.calculateSubTotal();
  }

  private updateAmountFromCache(productId: number, colorId: number, sizeId: number, isNegative: boolean){
    var updatedAmount = 0;
    var currentItem = this.productInfors.find(e => (e.product.id == productId
                                            && e.color.id == colorId
                                            && e.size.id == sizeId));
    updatedAmount = isNegative? currentItem.orderAmount - 1 : currentItem.orderAmount + 1;
    
    if(updatedAmount > currentItem.size.amount){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `There is only ${currentItem.size.amount} items in the storage!`,
      });
    } else{
      currentItem.orderAmount = updatedAmount;
      localStorage.setItem('shopping_cart', JSON.stringify(currentItem))
    }
  }

  private getItemFromCaches(){
    this.productInfors = this.shoppingCartService.getShoppingCartItems();
    this.productInfors.forEach(e => {
      e.product.original = this.classNameByNationalFlag(e.product.original),
      e.product.imagePath = this.convertImagePath(e.product.imagePath)
    });
  }

  private calculateTotal(orderAmount: number, productPrice: number){
    var discount = this.calculateDiscount(orderAmount);
    var totalPrice = productPrice*orderAmount;
    var totalPriceAfterDiscounted = totalPrice - ((totalPrice*discount)/100);
    return totalPriceAfterDiscounted;
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
    this.productInfors.forEach(element => {
      this.subTotal += this.calculateTotal(element.orderAmount, Number.parseFloat(element.product.defaultPrice));
    });
  }

  public calculateFinalTotal(event:any){
    this.finalTotal = this.subTotal + 5;
  }

  public removeItemsFromCache(){
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'This item has been deleted.',
          'success'
        )
      }
    });
  }

  private classNameByNationalFlag(original: string){
    var classNameByFlag = this.flagService.classByFlagName(original);
    return classNameByFlag;
  }

  private convertImagePath(imagePath: string){
    var path = `https://localhost:5001/Resources/Image_Files/${imagePath}`;
    return path;
  }

}
