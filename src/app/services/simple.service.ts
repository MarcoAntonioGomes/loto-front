import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class SimpleService {
  protected http: HttpClient;
  public baseUrl = `${environment.REST_URL}/`;

  protected options: {
    headers: HttpHeaders;
  };

  protected opcoes: {
    headers: HttpHeaders;
    params?:
      | HttpParams
      | {
          [param: string]: string | string[];
        };
  };

  constructor(
    http: HttpClient,
    options?: {
      headers: HttpHeaders;
    }
  ) {
    this.http = http;
    if (options === null) {
      this.options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
    } else {
      this.options = options;
    }
  }

  get(url: string, params?: HttpParams, options?: { headers: HttpHeaders }) {
    return this.http.get<Blob>(`${this.baseUrl}${url}`, options);
  }

  post(data: any, url: string, options?: { headers: HttpHeaders }) {
    return this.http.post<Blob>(`${this.baseUrl}${url}`, data, options);
  }
}
