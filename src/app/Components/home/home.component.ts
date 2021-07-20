import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
  shoesList = [
    {id: 1, name: 'Running Shoes', price: 19.99, rated: 5, image: '../../../assets/img/products/black-blue-shoes.png'},
    {id: 2, name: 'Running Shoes', price: 19.99, rated: 5, image: '../../../assets/img/products/black-red-shoes.png'},
    {id: 3, name: 'Running Shoes', price: 19.99, rated: 5, image: '../../../assets/img/products/gray-green-shoes.png'},
    {id: 4, name: 'Running Shoes', price: 19.99, rated: 5, image: '../../../assets/img/products/gray-pink-green-shoes.png'},
  ]

  constructor() { }

  ngOnInit(): void {
    
  }

}
