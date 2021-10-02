import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductColor } from 'src/app/Models/product-color';
import { ProductStatus } from 'src/app/Models/product-status';
import { NationalFlagProductService } from 'src/app/Services/national-flag-product.service';
import { ProductService } from 'src/app/Services/product.service';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import { ShoppingCartItem } from 'src/app/Models/shopping-cart-item';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { Products } from 'src/app/Models/products';

export interface DialogData{
  id: number,
  name: string,
  defaultPrice: string,
  original: string,
  image: string
}

@Component({
  selector: 'app-previews-product',
  templateUrl: './previews-product.component.html',
  styleUrls: ['./previews-product.component.css']
})
export class PreviewsProductComponent implements OnInit {
  faSearch = faSearch;
  faStar = faStar;

  public lstProdColor: ProductColor[];
  public lstProdStatus: ProductStatus[];

  public imagePath: string;
  public selectedProdColorIndex: number = null;
  public selectedProdStatusIndex: number = null;
  public availabilityProd: string = "No information";
  private remainingAmount: number;
  public inputAmount: number = 0;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, 
  public dialogRef: MatDialogRef<PreviewsProductComponent>,
  private flagService: NationalFlagProductService,
  private productService: ProductService,
  private shoppingCartService: ShoppingCartService) { }
  

  ngOnInit(): void {
    this.imagePath = this.convertImagePath(this.data.image);
    this.getProductColor(this.data.id);
  }

  public onCloseModal(){
    this.dialogRef.close();
  }

  public getProductColor(prodId: number){
    var key = `product_colors_for_productId: ${prodId}`;
    var prodColorsFromCache = this.productService.getItemsFromCache(key);
    if(!prodColorsFromCache){
      this.productService.getAllProductColors(prodId).subscribe((data) => {
        this.productService.setItemsToCache(key, data);
        this.lstProdColor = data;
      });
    } else{
      this.lstProdColor = prodColorsFromCache;
    }
  }

  public getProductStatus(prodColorId: number, index:number){
    var key = `product_statuses_for_prodColorId: ${prodColorId}`;
    this.selectedProdColorIndex = index;
    var prodStatusesFromCache = this.productService.getItemsFromCache(key);

    if(!prodStatusesFromCache){
      this.productService.getAllProductStatus(prodColorId).subscribe((data) => {
        this.productService.setItemsToCache(key, data);
        this.lstProdStatus = data;
      });
    } else{
      this.lstProdStatus = prodStatusesFromCache;
    }
  }

  public checkAvaibility(index: number){
    this.selectedProdStatusIndex = index;
    this.remainingAmount = this.lstProdStatus[index].amount;
    if(this.remainingAmount > 10){
      this.availabilityProd = ' - In stock';
    } else{
      this.availabilityProd = `Remaining ${this.remainingAmount} products in stock`;
    }
  }

  private convertImagePath(imagePath: string){
    var path = `https://localhost:5001/Resources/Image_Files/${imagePath}`;
    return path;
  }

  public onAddToCart(){
    var color = this.lstProdColor[this.selectedProdColorIndex];
    var message = '';
    if(color != undefined){
      var size = this.lstProdStatus[this.selectedProdStatusIndex];
      
      if(this.availabilityProd === 'No information' || this.inputAmount === 0){
        message = 'The options is invalided';
        
      } else if(this.inputAmount > this.remainingAmount){
        message = `There are only ${this.remainingAmount} products in stock. Please choose again!`;
      }
  
      if(message != ''){
        Swal.fire(message);
      } else{
        var product: Products = {
          id: this.data.id,
          name: this.data.name,
          defaultPrice: this.data.defaultPrice,
          original: this.data.original,
          imagePath: this.data.image,
          star: 0,
          description: "",
          createdAt: new Date()
        };

        var item: ShoppingCartItem = {
          product: product,
          color: color,
          size: size,
          orderAmount: this.inputAmount
        }
        this.shoppingCartService.addProduct(item);
        Swal.fire('Add product to cart successful', '', 'success');
      }
    } else{
      message = 'The options is invalided'
      Swal.fire(message);
    }
    
  }

  public classNameByNationalFlag(){
    var classNameByFlag = this.flagService.classByFlagName(this.data.original);
    return classNameByFlag;
  }
}
