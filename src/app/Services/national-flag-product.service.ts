import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NationalFlagProductService {

  constructor() { }

  public classByFlagName(original: string){
    var className = this.initFlagNameArray().find(e => e.name === original).className;

    return `flag-icon ${className} flag-icon-squared`;
  }

  private initFlagNameArray(){
    var flagArray=[
      {name: 'USA', className: 'flag-icon-us'},
      {name: 'America', className: 'flag-icon-us'},
      {name: 'United State', className: 'flag-icon-um'},
      {name: 'Japan', className: 'flag-icon-jp'},
      {name: 'China', className: 'flag-icon-cn'},
      {name: 'India', className: 'flag-icon-in'},
      {name: 'Viet Nam', className: 'flag-icon-vn'},
      {name: 'Korea', className: 'flag-icon-kr'},
      {name: 'Russia', className: 'flag-icon-ru'},
      {name: 'Italia', className: 'flag-icon-it'},
      {name: 'United Kingdom', className: 'flag-icon-gb'},
      {name: 'England', className: 'flag-icon-gb-eng'},
    ];

    return flagArray;
  }
}
