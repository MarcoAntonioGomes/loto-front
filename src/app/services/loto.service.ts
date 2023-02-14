import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenerateLoto } from '../models/generate-loto.model';
import { SimpleService } from './simple.service';

@Injectable({
  providedIn: 'root',
})
export class LotoService extends SimpleService {
  constructor(http: HttpClient) {
    super(http);
  }

  gerarDadosLoteria(generateLoto: GenerateLoto) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      responseType: 'blob' as 'json',
    };

    this.get(
      'lotomega/generate?numbers=' + generateLoto.numbers,
      null,
      httpOptions
    ).subscribe((res) => {
      const blob = new Blob([res], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'loto.xlsx';
      link.click();
    });
  }
}
