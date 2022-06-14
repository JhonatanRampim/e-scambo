import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMovel } from '../shared/model/movel.interface';

@Injectable({
  providedIn: 'root'
})
export class MovelService {
  public moveis: Observable<IMovel[]>;

  constructor(public httpClient: HttpClient) { }


  getMoveisAnunciados() {
    return this.httpClient.get<any>(environment.apiUrl + 'movel')
      .pipe(map(moveis => moveis.data));
  }

  getMovelAnuncio(id) {
    return this.httpClient.get<any>(environment.apiUrl + 'movel/' + id)
      .pipe(map(moveis => moveis.data[0]));
  }
  getUserAnuncio(usuarioId, movelId?) {
    return this.httpClient.get<any>(`${environment.apiUrl}movel/user/${usuarioId}}`)
      .pipe(map(moveis => moveis.data));
  }
  create(formData: FormData) {
    return this.httpClient.post<any>(environment.apiUrl + 'movel', formData)
      .pipe(map(moveis => moveis));
  }
  edit(formData: FormData) {
    return this.httpClient.post<any>(environment.apiUrl + 'movel/edit', formData)
      .pipe(map(moveis => moveis));
  }
}
