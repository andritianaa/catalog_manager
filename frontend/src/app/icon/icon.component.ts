import { Component } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `
    <div>
      <svg [innerHTML]="svgIcon"></svg>
    </div>
  `,
  styles: [`
    div {
      width: 24px;
      height: 24px;
    }
  `]
})
export class IconComponent {
  svgIcon!: string;

  constructor() {
    this.fetchSvgIcon();
  }

  fetchSvgIcon() {
    fetch('assets/icons/trash.svg')
      .then(response => response.text())
      .then(svgData => {
        this.svgIcon = svgData;
      });
  }
}
