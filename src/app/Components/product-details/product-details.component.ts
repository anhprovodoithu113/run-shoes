import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';
import { CustomerReviews } from 'src/app/Models/customer-reviews';
import { ProductColor } from 'src/app/Models/product-color';
import { ProductStatus } from 'src/app/Models/product-status';
import { Products } from 'src/app/Models/products';
import { NationalFlagProductService } from 'src/app/Services/national-flag-product.service';
import { ProductService } from 'src/app/Services/product.service';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { ShoppingCartItem } from 'src/app/Models/shopping-cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  faStar = faStar;
  productStarArr: number[] = [];
  remainingStarArr: number[] = [];
  
  public product: Products;
  public customerReviews: CustomerReviews[];
  public lstProduct: Products[];
  public lstProdColor: ProductColor[];
  public lstProdStatus: ProductStatus[];
  private selectedProdColorIndex: number;
  private selectedProdStatusIndex: number;
  private remainingAmount: number;
  public inputAmount: number = 0;
  public avabilityStatus: string = 'No information';
  private productIdFromRoute: number;

  constructor(private route: ActivatedRoute, 
    private productService: ProductService,
    private flagService: NationalFlagProductService,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.productIdFromRoute = Number(routeParams.get('productId'));
    this.getProductById(this.productIdFromRoute);
    this.getAllProducts();
    this.getProductColorByProductId(this.productIdFromRoute);
    this.countingStarArr(this.product.star);
  }

  public onAddToCart(){
    var color = this.lstProdColor[this.selectedProdColorIndex];
    var message = '';
    if(color != undefined){
      var size = this.lstProdStatus[this.selectedProdStatusIndex];
      
      if(this.avabilityStatus === 'No information' || this.inputAmount === 0){
        message = 'The options is invalided';
        
      } else if(this.inputAmount > this.remainingAmount){
        message = `There are only ${this.remainingAmount} products in stock. Please choose again!`;
      }
  
      if(message != ''){
        Swal.fire(message);
      } else{
        var item: ShoppingCartItem = {
          product: this.product,
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

  public checkAvaibility(index: number){
    this.selectedProdStatusIndex = index;
    this.remainingAmount = this.lstProdStatus[index].amount;
    if(this.remainingAmount > 10){
      this.avabilityStatus = ' - In stock';
    } else{
      this.avabilityStatus = `Remaining ${this.remainingAmount} products in stock`;
    }
  }

  private getProductById(productId: number){
    var key = `product_details: ${productId}`;
    var productFromCache = this.productService.getItemsFromCache(key);
    if(!productFromCache){
      this.productService.getProductById(productId).subscribe((data: any) => {
        this.productService.setItemsToCache(key, data);
        this.product = data;
        this.customerReviews = data.customerReviews;
      });
    } else{
      this.product = productFromCache;
      this.customerReviews = productFromCache.customerReviews;
    }
  };

  private getProductColorByProductId(productId: number){
    var key = `product_colors_for_productId: ${productId}`;
    var productColorsFromCache = this.productService.getItemsFromCache(key);

    if(!productColorsFromCache){
      this.productService.getAllProductColors(productId).subscribe((data: ProductColor[]) => {
        this.productService.setItemsToCache(key, data);
        this.lstProdColor = data;
      });
    } else{
      this.lstProdColor = productColorsFromCache;
    }
  }

  public getProductStatus(productColorId: number, index: number){
    this.selectedProdColorIndex = index;
    var key = `product_statuses_for_prodColorId: ${productColorId}`;
    var productStatusesFromCache = this.productService.getItemsFromCache(key);
    if(!productStatusesFromCache){
      this.productService.getAllProductStatus(productColorId).subscribe((data) => {
        this.productService.setItemsToCache(key, data);
        this.lstProdStatus = data;
      });
    } else{
      this.lstProdStatus = productStatusesFromCache;
    }
  }

  private countingStarArr(productStar: number){
    var remainingStar = 5-productStar;
    for (let index = 0; index < remainingStar; index++) {
      this.remainingStarArr.push(2);
    }

    for (let index = 0; index < productStar; index++) {
      this.productStarArr.push(1);
    }
  }

  public createImgPath = (serverPath: string) => {
    var path = `https://localhost:5001/Resources/Image_Files/${serverPath}`;
    return path;
  }

  private getAllProducts(){
    var lstProductFromCache = this.productService.getItemsFromCache('lstProduct');
    if(!lstProductFromCache){
      this.productService.getAllProducts().subscribe((data: Products[]) =>{
        var uniqueArray = this.getDistinctValue(data, 'name');
        this.productService.setItemsToCache('lstProduct', uniqueArray);
        var currentProduct = uniqueArray.find(p => p.id === this.productIdFromRoute);
        const index = uniqueArray.indexOf(currentProduct);
        uniqueArray.splice(index, 1);
        this.lstProduct = uniqueArray.slice(0, 3);
      });
    } else{
      var currentProduct = lstProductFromCache.find(p => p.id === this.productIdFromRoute);
      const index = lstProductFromCache.indexOf(currentProduct);
      lstProductFromCache.splice(index, 1);
      this.lstProduct = lstProductFromCache.slice(0,3);
    }
  }

  private getDistinctValue(data: Products[], key: string){
    // Map object holds the key-value pairs
    // map function like forEach but it will return the result
    const arrayUniqueByKey=[...new Map(data.map(item => [item[key], item])).values()];
    return arrayUniqueByKey;
  }

  public classNameByNationalFlag(original: string){
    var classNameByFlag = this.flagService.classByFlagName(original);
    return classNameByFlag;
  }
}
