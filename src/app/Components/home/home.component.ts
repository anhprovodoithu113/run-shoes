import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/Models/products';
import { ProductService } from 'src/app/Services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { PreviewsProductComponent } from 'src/app/Modals/previews-product/previews-product.component';
import { NationalFlagProductService } from 'src/app/Services/national-flag-product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  featuredProducts: Products[] = [];
  newProducts: Products[] = [];

  constructor(private productService: ProductService, public dialog: MatDialog, private flagService: NationalFlagProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts(){
    this.productService.getAllProducts().subscribe((data: Products[]) =>{
      var uniqueArray = this.getDistinctValue(data, 'name');
      this.featuredProducts = uniqueArray.slice(0,4);

      var sortedArray = uniqueArray.sort((a,b) => a.createdAt < b.createdAt? 1 : -1);
      this.newProducts = sortedArray.slice(0, 4);
    });
  }

  private openDialog(id: number, name: string, defaultPrice: string, original: string, image: string){
    this.dialog.open(PreviewsProductComponent, {
      data: {id, name, defaultPrice, original, image}
    });
  }

  private getDistinctValue(data: Products[], key: string){
    // Map object holds the key-value pairs
    // map function like forEach but it will return the result
    const arrayUniqueByKey=[...new Map(data.map(item => [item[key], item])).values()];
    return arrayUniqueByKey;
  }

  public createImgPath = (serverPath: string) => {
    var path = `https://localhost:5001/Resources/Image_Files/${serverPath}`;
    return path;
  }

  public classNameByNationalFlag(original: string){
    var classNameByFlag = this.flagService.classByFlagName(original);
    return classNameByFlag;
  }
}
