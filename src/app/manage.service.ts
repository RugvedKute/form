import { Injectable } from '@angular/core';
import { dataSelected } from './models/data.model';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor() { }


  dateArray: dataSelected[] = []

  updateData(data: dataSelected[]) {
    this.dateArray = data;
  }

  updateSelected(index: number) {
    this.dateArray[index].selected= !this.dateArray[index].selected;
  }


  getData() {
    return this.dateArray
  }
}
