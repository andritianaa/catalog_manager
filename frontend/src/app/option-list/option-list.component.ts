import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss']
})
export class OptionListComponent implements AfterViewInit {
  dragged: any;
  dropSortNumber!: number;

  data = [
    {
      name: 'Viandes',
      used: '3 SKUs'
    },
    {
      name: 'Viandes',
      used: '2 SKUs'
    },
    {
      name: 'Viandes',
      used: 'Tacos à composer Bazooka (Big Tacos)'
    },
    {
      name: 'Sauces',
      used: '35 SKUs'
    },
    {
      name: 'Crudités',
      used: '6 SKUs'
    },
    {
      name: 'Boisson',
      used: '0'

    },
  ]
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

  isDetail = false
  showDetail(element: HTMLElement) {
    this.isDetail = true;
    const elements = this.elementRef.nativeElement.querySelectorAll('.option');
    elements.forEach((el: any) => {
      el.classList.remove('active');
    });
    element.classList.add('active');
  }


  hideDetail() {
    this.isDetail = false;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.dropSortNumber = 0;
  }

  ngAfterViewInit(): void {

  }
}
