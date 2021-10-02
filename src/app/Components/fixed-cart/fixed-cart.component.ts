import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-fixed-cart',
  templateUrl: './fixed-cart.component.html',
  styleUrls: ['./fixed-cart.component.css']
})
export class FixedCartComponent implements OnInit {
  
  constructor(public shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }


  
}
