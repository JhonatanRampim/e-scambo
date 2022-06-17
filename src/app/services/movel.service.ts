import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { options } from '../pages/user-anuncio/user-anuncio.module';
import { IMovel } from '../shared/model/movel.interface';

@Injectable({
  providedIn: 'root'
})
export class MovelService {
  public moveis: Observable<IMovel[]>;

  constructor(public httpClient: HttpClient) { }


  getMoveisAnunciados(nome?: string, categoria?: string) {
    let params = new HttpParams();
    if (nome) {
      params = params.set('nome', nome)
    }
    if(categoria) {
      params = params.set('categoria', categoria);
    }
    return this.httpClient.get<any>(environment.apiUrl + 'movel', { params: params })
      .pipe(map(moveis => moveis.data));
  }

  getMovelAnuncio(id) {
    let params = new HttpParams();

    params = params.set('id', id);
    return this.httpClient.get<any>(environment.apiUrl + 'movel', { params })
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
  delete(movelId, usuarioId) {
    return this.httpClient.delete(environment.apiUrl + 'movel/delete', {
      body: {
        movel_id: movelId,
        usuario_id: usuarioId
      }
    })
      .pipe(map(moveis => moveis));
  }
}
