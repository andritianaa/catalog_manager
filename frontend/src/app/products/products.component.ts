import { Component, Output, EventEmitter, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { productList } from '../../../fakeData/products'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss', './../navbar/new-category.component.scss']
})
export class ProductsComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { this.dropSortNumber = 0 }

  @Output() fileSelected = new EventEmitter<File>()
  data = productList
  isCategory = false
  isDetail = false
  isAddSku = false
  draggedCategory: any
  draggedProduct: any
  dropSortNumber!: number

  handleFileInput(event: any) { this.fileSelected.emit(event.target.files[0]) }
  showCategory() { this.isCategory = this.isDetail = true }
  showProduct() {
    this.isCategory = false
    this.isDetail = true
  }
  hideDetail() {
    this.isDetail = false
    const elements = this.elementRef.nativeElement.querySelectorAll('.active')
    elements.forEach((active: any) => active.classList.remove('active'))
  }
  hideAddSku() { this.isAddSku = false }
  showAddSku() { this.isAddSku = true }
  onDragStartCategory(event: DragEvent, category: any) {
    this.draggedCategory = category
    event.dataTransfer?.setData('text', '')
  }
  onDragOverCategory(event: DragEvent) { event.preventDefault() }
  onDropCategory(event: DragEvent, category: any) {
    event.preventDefault()
    this.dropSortNumber = this.data.indexOf(this.draggedCategory)
    const draggedIndex = this.data.indexOf(this.draggedCategory)
    const droppedIndex = this.data.indexOf(category)
    if (draggedIndex > -1) this.data.splice(draggedIndex, 1).splice(droppedIndex, 0, this.draggedCategory)
    this.draggedCategory = null
  }
  onDragStartProduct(event: DragEvent, product: any) {
    this.draggedProduct = product
    event.dataTransfer?.setData('text', '')
  }
  onDragOverProduct(event: DragEvent) { event.preventDefault() }
  onDropProduct(event: DragEvent, product: any) {
    event.preventDefault()
    let droppedIndex, draggedIndex, dropSortNumber
    for (let i = 0; i < this.data.length; i++) {
      dropSortNumber = this.data[i].products.indexOf(this.draggedProduct)
      draggedIndex = this.data[i].products.indexOf(this.draggedProduct)
      droppedIndex = this.data[i].products.indexOf(product)
      if (draggedIndex > -1 && droppedIndex > -1 && draggedIndex > -1) {
        this.data[i].products.splice(draggedIndex, 1)
        this.data[i].products.splice(droppedIndex, 0, this.draggedProduct)
        break
      }
    }
    this.draggedProduct = null
  }
  ngAfterViewInit(): void {
    const elements = this.elementRef.nativeElement.querySelectorAll('.option')
    for (let i = 0; i < elements.length; i++) {
      this.renderer.listen(elements[i], 'click', (event) => {
        this.elementRef.nativeElement.querySelectorAll('.active').forEach((active: any) => active.classList.remove('active'))
        event.target.classList.add('active')
      })
    }
  }

}