import { Component, Output, EventEmitter } from '@angular/core';
import { productList } from '../../../fakeData/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @Output() fileSelected = new EventEmitter<File>();
  data = productList
  isCategory = true

  handleFileInput(event: any) { this.fileSelected.emit(event.target.files[0]) }

  showCategory() { this.isCategory = true }
  showProduct() { this.isCategory = false }


  draggedCategory: any;
  draggedProduct: any;
  dropSortNumber!: number;

  constructor() {
    this.dropSortNumber = 0;
  }
  onDragStartCategory(event: DragEvent, category: any) {
    this.draggedCategory = category;
    event.dataTransfer?.setData('text', '');
  }

  onDragStartProduct(event: DragEvent, product: any, category: any) {
    this.draggedProduct = product;
    this.draggedCategory = category;
    event.dataTransfer?.setData('text', '');
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, category: any) {
    event.preventDefault();
    if (this.draggedProduct) {
      this.dropSortNumber = category.sort;
      const draggedIndex = this.draggedCategory.products.indexOf(this.draggedProduct);
      const droppedIndex = category.products.indexOf(this.draggedProduct);
      if (draggedIndex > -1) {
        this.draggedCategory.products.splice(draggedIndex, 1);
      }
      if (droppedIndex > -1) {
        category.products.splice(droppedIndex, 0, this.draggedProduct);
      }
      this.draggedProduct = null;
      this.draggedCategory = null;
    } else if (this.draggedCategory) {
      this.dropSortNumber = this.data.indexOf(this.draggedCategory);
      const draggedIndex = this.data.indexOf(this.draggedCategory);
      const droppedIndex = this.data.indexOf(category);
      if (draggedIndex > -1) {
        this.data.splice(draggedIndex, 1);
      }
      if (droppedIndex > -1) {
        this.data.splice(droppedIndex, 0, this.draggedCategory);
      }
      this.draggedCategory = null;
      console.log(this.dropSortNumber);

    }
  }
}
