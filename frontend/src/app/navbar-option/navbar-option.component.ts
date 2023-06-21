import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-option',
  templateUrl: './navbar-option.component.html',
  styleUrls: ['./navbar-option.component.scss', './../navbar/new-category.component.scss']
})
export class NavbarOptionComponent {
  showModal = false
  @Input() isDeletePossible!: boolean;
  toggleNewModal() { this.showModal = !this.showModal }
}
