import { Component, Output, EventEmitter } from '@angular/core';
import { productList } from '../../../fakeData/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @Output() fileSelected = new EventEmitter<File>();

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.fileSelected.emit(file);
  }

  isCategory = true;

  showCategory() {
    this.isCategory = true;
  }
  showProduct() {
    this.isCategory = false;
  }

  data = productList
}
