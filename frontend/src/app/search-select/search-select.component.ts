import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { get_skus } from '../../../fakeData/skus'
@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss']
})


export class SearchSelectComponent implements OnInit, AfterViewInit {
  data = get_skus

  public websiteMultiCtrl: FormControl = new FormControl();
  public websiteMultiFilterCtrl: FormControl = new FormControl();
  public filteredWebsitesMulti = new ReplaySubject(1);

  @ViewChild('multiSelect', { static: true })
  multiSelect!: MatSelect;
  protected _onDestroy = new Subject();
  constructor() { }
  ngOnInit() {
    this.websiteMultiCtrl.setValue(this.data[1]);
    this.filteredWebsitesMulti.next(this.data.slice());
    this.websiteMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterWebsiteMulti());
  }
  ngAfterViewInit() { this.setInitialValue() }

  protected setInitialValue() {
    this.filteredWebsitesMulti.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => this.multiSelect.compareWith = (a: any, b: any) => a && b && a._id === b._id);
  }
  protected filterWebsiteMulti() {
    if (!this.data) return;
    let search = this.websiteMultiFilterCtrl.value;
    if (!search) {
      this.filteredWebsitesMulti.next(this.data.slice());
      return;
    } else search = search.toLowerCase();
    this.filteredWebsitesMulti.next(this.data.filter(bank => bank.name.toLowerCase().indexOf(search) > -1));
  }
}

