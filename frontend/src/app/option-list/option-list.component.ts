import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { get_optionList } from '../../../fakeData/optionList';
import { IOption, IOptionList } from '../../utils/types';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss']
})
export class OptionListComponent implements AfterViewInit {
  dragged: any;
  dropSortNumber!: number;
  isDeletePossible: boolean = false
  data = get_optionList

  displayList: IOptionList = {
    ref: "",
    name: "",
    min_selections: 0,
    max_selections: 0,
    tags: [],
    options: [],
    sort: 0
  }



  onDragStart(event: DragEvent, category: any) {
    this.dragged = category;
    event.dataTransfer?.setData('text', '');
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  onDrop(event: DragEvent, category: any) {
    event.preventDefault();
    this.dropSortNumber = this.data.indexOf(this.dragged);
    const draggedIndex = this.data.indexOf(this.dragged);
    const droppedIndex = this.data.indexOf(category);
    if (draggedIndex > -1) {
      this.data.splice(draggedIndex, 1);
      this.data.splice(droppedIndex, 0, this.dragged);
    }
    this.dragged = null;
  }


  onDragStartOption(event: DragEvent, category: any) {
    this.dragged = category;
    event.dataTransfer?.setData('text', '');
  }

  onDragOverOption(event: DragEvent) {
    event.preventDefault();
  }
  onDropOption(event: DragEvent, category: any, i: number) {
    event.preventDefault();

    this.dropSortNumber = this.displayList.options.indexOf(this.dragged)
    const draggedIndex = this.displayList.options.indexOf(this.dragged)
    const droppedIndex = this.displayList.options.indexOf(category);
    if (draggedIndex > -1) {
      this.displayList.options.splice(draggedIndex, 1);
      this.displayList.options.splice(droppedIndex, 0, this.dragged);
    }
    this.dragged = null;
  }



  isDetail = false
  showDetail(element: HTMLElement, list: IOptionList) {
    this.displayList = list
    this.isDetail = true;
    this.isDeletePossible = true;
    const elements = this.elementRef.nativeElement.querySelectorAll('.option');
    elements.forEach((el: any) => {
      el.classList.remove('active');
    });
    element.classList.add('active');
  }

  newOption() {
    this.displayList.options?.push({
      ref: "",
      name: "",
      price: "0.00 EUR",
      default: true,
      tags: [],
      sort: 0,
      afficher: true,
      _id: "",
    })
  }


  hideDetail() {
    this.isDetail = false;
    this.isDeletePossible = false;
    const elements = this.elementRef.nativeElement.querySelectorAll('.active')
    elements.forEach((active: any) => active.classList.remove('active'))
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.dropSortNumber = 0;
  }

  ngAfterViewInit(): void {

  }
}
