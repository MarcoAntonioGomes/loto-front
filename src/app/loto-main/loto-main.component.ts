import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-loto-main',
  templateUrl: './loto-main.component.html',
  styleUrls: ['./loto-main.component.scss'],
})
export class LotoMainComponent implements OnInit {
  items: MenuItem[] = [];
  activeItem: MenuItem = {};

  constructor() {}

  ngOnInit(): void {}

  initMenu() {
    this.items = [{ label: 'Home', icon: 'pi pi-fw pi-home' }];

    this.activeItem = this.items[0];
  }
}
