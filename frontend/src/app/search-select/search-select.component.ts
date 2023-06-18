import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss']
})


export class SearchSelectComponent implements OnInit, AfterViewInit {

  websites = [
    { id: '1', name: 'Viande (3 SKUs)' },
    { id: '2', name: 'Viande (2 SKUs)' },
    { id: '3', name: 'Sauces (35 SKUs)' },
    { id: '4', name: 'dd' },
  ];

  public websiteMultiCtrl: FormControl = new FormControl();
  public websiteMultiFilterCtrl: FormControl = new FormControl();
  public filteredWebsitesMulti = new ReplaySubject(1);

  @ViewChild('multiSelect', { static: true })
  multiSelect!: MatSelect;
  protected _onDestroy = new Subject();
  constructor() { }
  ngOnInit() {
    this.websiteMultiCtrl.setValue(this.websites[1]);
    this.filteredWebsitesMulti.next(this.websites.slice());
    this.websiteMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterWebsiteMulti());
  }
  ngAfterViewInit() { this.setInitialValue() }

  protected setInitialValue() {
    this.filteredWebsitesMulti.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => this.multiSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id);
  }
  protected filterWebsiteMulti() {
    if (!this.websites) return;
    let search = this.websiteMultiFilterCtrl.value;
    if (!search) {
      this.filteredWebsitesMulti.next(this.websites.slice());
      return;
    } else search = search.toLowerCase();
    this.filteredWebsitesMulti.next(this.websites.filter(bank => bank.name.toLowerCase().indexOf(search) > -1));
  }
}

