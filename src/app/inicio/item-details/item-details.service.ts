import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {

  private item: any;

  constructor() { }

  setItem(item: any) { this.item = item; }
  getItem(): any { return this.item; }

}
