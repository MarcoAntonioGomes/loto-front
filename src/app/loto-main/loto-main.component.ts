import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LotoService } from '../services/loto.service';
import { GenerateLoto } from '../models/generate-loto.model';

@Component({
  selector: 'app-loto-main',
  templateUrl: './loto-main.component.html',
  styleUrls: ['./loto-main.component.scss'],
})
export class LotoMainComponent implements OnInit {
  items: MenuItem[] = [];
  activeItem: MenuItem = {};
  value4: number = 10;
  indexes: number[] = [];
  numberForm!: FormGroup;
  numbersChosen: number[] = [];
  displayModal: boolean = false;
  existemNumerosRepetidosModal: boolean = false;

  constructor(private service: LotoService) {}

  ngOnInit(): void {
    this.initMenu();
    this.initIndexes();
    this.initializeForm();
  }

  initMenu() {
    this.items = [{ label: 'Home', icon: 'pi pi-fw pi-home' }];

    this.activeItem = this.items[0];
  }

  private initializeForm() {
    this.buildForm();
  }

  private buildForm() {
    const formGroup: FormGroup = new FormGroup({});

    for (let i = 0; i < this.value4; i++) {
      formGroup.addControl(
        `dezena-${i + 1}`,
        new FormControl(undefined, [
          Validators.required,
          Validators.min(1),
          Validators.max(80),
        ])
      );
    }

    this.numberForm = formGroup;
  }

  initIndexes() {
    this.indexes = Array.from(Array(this.value4).keys());
    this.indexes = this.indexes.map((x) => x + 1);
  }

  regerarInputsDezenas(val: number) {
    this.value4 = val;
    this.initIndexes();
    this.buildForm();
  }

  get formControls() {
    return this.numberForm.controls;
  }

  verificarNumerosRepetidos(numbers: number[]) {
    let numbersSet = new Set(numbers);
    return numbers.length !== numbersSet.size;
  }

  gerar() {
    if (this.numberForm.invalid) {
      this.displayModal = true;
      return;
    }
    this.numbersChosen = [];
    for (let i = 0; i < this.value4; i++) {
      this.numbersChosen.push(
        this.numberForm.controls[`dezena-${i + 1}`].value
      );
    }

    if (this.verificarNumerosRepetidos(this.numbersChosen)) {
      this.existemNumerosRepetidosModal = true;
      return;
    }

    let generateLoto: GenerateLoto = {
      numbers: this.numbersChosen,
    };

    this.service.gerarDadosLoteria(generateLoto);
  }
}
