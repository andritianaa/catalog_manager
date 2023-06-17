import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', './new-category.component.scss']
})
export class NavbarComponent {
  showNewProduct = false
  showNewCategory = false
  toggleNewProduct() { this.showNewProduct = !this.showNewProduct }
  toggleNewCategory() { this.showNewCategory = !this.showNewCategory }
}
