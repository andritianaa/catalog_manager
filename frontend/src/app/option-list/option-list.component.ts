import { Component } from '@angular/core';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss']
})
export class OptionListComponent {
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

  isDetail = true
  toggleDetail() {
    this.isDetail = !this.isDetail;
  }
}
