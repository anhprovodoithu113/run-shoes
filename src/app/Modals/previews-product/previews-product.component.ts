import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductColor } from 'src/app/Models/product-color';
import { ProductStatus } from 'src/app/Models/product-status';
import { NationalFlagProductService } from 'src/app/Services/national-flag-product.service';
import { ProductService } from 'src/app/Services/product.service';
import Swal from 'sweetalert2';

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
  public lstProdColor: ProductColor[];
  public lstProdStatus: ProductStatus[];

  public imagePath: string;
  public selectedProdColorIndex: number = null;
  public selectedProdStatusIndex: number = null;
  public availabilityProd: string = "No information";
  private remainingAmount: number;
  public inputAmount: number = 0;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, 
  private flagService: NationalFlagProductService,
  private productService: ProductService) { }
  

  ngOnInit(): void {
    this.imagePath = this.convertImagePath(this.data.image);
    this.getProductColor(this.data.id);
  }

  public getProductColor(prodId: number){
    this.productService.getAllProductColors(prodId).subscribe((data) => {
      this.lstProdColor = data;
    });
  }

  public getProductStatus(prodColorId: number, index:number){
    this.selectedProdColorIndex = index;
    this.productService.getAllProductStatus(prodColorId).subscribe((data) => {
      this.lstProdStatus = data;
    });
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
    var size = this.lstProdStatus[this.selectedProdStatusIndex];
    var message = '';
    if(this.availabilityProd === 'No information' || this.inputAmount === 0){
      message = 'The options is invalided';
      
    } else if(this.inputAmount > this.remainingAmount){
      message = `There are only ${this.remainingAmount} products in stock. Please choose again!`;
    }

    if(message != ''){
      Swal.fire(message);
    }
  }

  public classNameByNationalFlag(){
    var classNameByFlag = this.flagService.classByFlagName(this.data.original);
    return classNameByFlag;
  }
}
