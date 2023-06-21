import { Component, Output, EventEmitter, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { get_category } from '../../../fakeData/category';
import { ICategory, IProduct, ISku } from '../../utils/types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss', './../navbar/new-category.component.scss']
})
export class ProductsComponent implements AfterViewInit {
  @Output() fileSelected = new EventEmitter<File>();
  data = get_category
  isCategory = false
  isDetail = false
  isAddSku = false
  isDeletePossible: boolean = false
  displayCategory: ICategory = {
    ref: "",
    name: "",
    description: "",
    tags: [],
    thumbnail: "",
    sort: 0,
    afficher: true,
    products: [],
    _id: ""
  }

  displayProduct: IProduct = {
    ref: "",
    category_id: "",
    name: "",
    description: "",
    tags: [],
    thumbnail: "",
    skus: [],
    sort: 0,
    afficher: true,
    _id: ""
  }

  displaySku: ISku = {
    ref: "",
    name: "",
    price: "",
    option_list_ids: [],
    sort: 0,
    afficher: true,
    _id: ""
  }


  showCategory(category: ICategory) {
    this.isCategory = true
    this.isDeletePossible = true
    this.isDetail = true
    this.displayCategory = category
  }

  skuId = 0
  swichSku(id: number) {
    if (this.displayProduct.skus && this.displayProduct.skus[id]) {
      this.displaySku = this.displayProduct.skus[id]
    }
  }
  showProduct(product: any) {
    this.skuId = 0
    this.displaySku = {
      ref: "",
      name: "",
      price: "",
      option_list_ids: [],
      sort: 0,
      afficher: true,
      _id: ""
    }
    this.isCategory = false
    this.isDetail = true
    this.isDeletePossible = true
    this.displayProduct = product
    if (!product.description) this.displayProduct.description = ""
    if (this.displayProduct.skus && this.displayProduct.skus[this.skuId]) {
      this.displaySku = this.displayProduct.skus[this.skuId]
    }
  }

  showAddSku() {
    this.isAddSku = true
  }
  hideAddSku() {
    this.isAddSku = false
  }
  hideDetail() {
    this.skuId = 0
    this.isDetail = false
    this.isDeletePossible = false
    const elements = this.elementRef.nativeElement.querySelectorAll('.active')
    elements.forEach((active: any) => active.classList.remove('active'))
  }
  handleFileInput(event: any) { this.fileSelected.emit(event.target.files[0]) }


  draggedCategory: any;
  draggedProduct: any;
  dropSortNumber!: number;


  onDragStartCategory(event: DragEvent, category: any) {
    this.draggedCategory = category;
    event.dataTransfer?.setData('text', '');
  }
  onDragOverCategory(event: DragEvent) {
    event.preventDefault();
  }
  onDropCategory(event: DragEvent, category: any) {
    event.preventDefault();
    this.dropSortNumber = this.data.indexOf(this.draggedCategory);
    const draggedIndex = this.data.indexOf(this.draggedCategory);
    const droppedIndex = this.data.indexOf(category);
    if (draggedIndex > -1) {
      this.data.splice(draggedIndex, 1);
      this.data.splice(droppedIndex, 0, this.draggedCategory);
    }
    this.draggedCategory = null;
  }


  onDragStartProduct(event: DragEvent, product: any) {
    this.draggedProduct = product;
    event.dataTransfer?.setData('text', '');
  }
  onDragOverProduct(event: DragEvent) {
    event.preventDefault();
  }
  onDropProduct(event: DragEvent, product: any) {
    event.preventDefault();

    let droppedIndex, draggedIndex, dropSortNumber;
    for (let i = 0; i < this.data.length; i++) {
      console.log('dropped: ', i);

      dropSortNumber = this.data[i].products.indexOf(this.draggedProduct)
      draggedIndex = this.data[i].products.indexOf(this.draggedProduct)
      droppedIndex = this.data[i].products.indexOf(product)
      console.log('dropSortNumber ', dropSortNumber);
      console.log('draggedIndex ', draggedIndex);
      console.log('droppedIndex ', droppedIndex);

      if (draggedIndex > -1 && droppedIndex > -1 && draggedIndex > -1) {
        console.log('replace');
        this.data[i].products.splice(draggedIndex, 1);
        this.data[i].products.splice(droppedIndex, 0, this.draggedProduct);
        break
      }
    }
    this.draggedProduct = null;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.dropSortNumber = 0;
  }

  ngAfterViewInit(): void {
    const elements = this.elementRef.nativeElement.querySelectorAll('.option');
    for (let i = 0; i < elements.length; i++) {
      this.renderer.listen(elements[i], 'click', (event) => {
        elements.forEach((element: any) => element.classList.remove('active'));
        event.target.classList.add('active')
      });
    }
  }
}

